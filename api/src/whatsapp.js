"use strict";

const mariadb = require('mariadb');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const sqs = new SQSClient({region: process.env.AWS_REGION || "us-east-1"});


const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;

// facebook - EAAW3XT0wzV4BO0yfN4f81WXypCYwYTank7ngZC5QEQtIJCXkEZAjoZCMcbpZCtbtZAuanWR42WzOurGZA7AnyT7GP9bapD2fxwhNmu8ZAk0QsgWb8iWJaOzZBO5c2k1T3goNCzRKbPP8GAQNGB4DbrdkzyKAmPZCZB31xcyGZAWLD6tI9ZAAYqLps3YEs5d52kpkIffYLwZDZD


const db_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}


const Utils = require("./utils");

const formatters = new Utils.Formatters();
const returns = new Utils.Returns();
const queries = new Utils.Queries();


const openConnection = () => {
  return new Promise(async (resolve, reject) => {
      try {
          console.log("Abrindo nova conexao...");
          var connection = await mariadb.createConnection({
              host: db_config.host,
              user: db_config.user,
              password: db_config.password,
              database: db_config.database,
              pipelining: true,
              connectTimeout: 10000,
              socketTimeout: 10000,
          });

          //return resolve(await setDefaultParamsOnConnection(connection));
          return resolve(connection);

      } catch (err) {
          console.error(err);
          return reject(err);
      }
  });
};



const closeConnection = (conn) => {
  if(conn){
    console.log("Fechando conexao com banco");
    conn.end();
    return true;
  } else {
    return false;
  }
  
};




const markRead = (business_phone_number_id, message) => {
    console.log("Marcou como lida");
    var data = {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message?.id,
    };
    
    var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`;

    axios.post(url, data, {headers: {Authorization: `Bearer ${GRAPH_API_TOKEN}`}});
};


const saveToDB = async (data)=>{

  var connection = await openConnection();
  var retorno = Promise.resolve(data)
  .then(d =>{
    var query = queries.constructQueryMessageSave(d, db_config);
    return Promise.resolve(query);
  })
  .then(async q => {
    console.log("Executando query", q);
    return (new Promise(async (resolve, reject) => {
      await connection.beginTransaction();
      try{
        var lastResult = await connection.query(q);
        await connection.commit();
        return resolve({status: "OK", data:{affectedRows: lastResult.affectedRows}});
      }catch(e){
        await connection.rollback();
        return reject(e);
      }
    }));
  })
  .finally(()=>closeConnection(connection))
  
  return retorno;
  
}



module.exports.receive_message = async (event) => {
  //console.log(JSON.stringify(event));
  var body = JSON.parse(event.body);
  //console.log(body);
  const message = body.entry?.[0]?.changes?.[0]?.value;

  //markRead(business_phone_number_id, message);   

  var data = {
    "message_id":message?.messages?.[0]?.id,
    "from_id":message?.contacts?.[0]?.wa_id,
    "from_name":message?.contacts?.[0]?.profile?.name,
    "from_phone": message?.messages?.[0]?.from,
    "to_id":message?.metadata?.phone_number_id,
    "to_name":"Atualise Serviços Digitais",
    "to_phone": message?.metadata?.display_phone_number,
    "window_id":"",
    "text_message":message?.messages?.[0]?.text?.body,
    "document_message":"",
    "created_at":formatters.formatTimestampToDatetime(Date.now()),
  };

  


  var retorno = Promise.resolve(data)
  .then(async data => {
    await sqs.send(new SendMessageCommand({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify(data),
    }));
    return Promise.resolve(data);
  })
  .then(saveToDB)
  .then(()=>{
    return {
      statusCode:200,
      body: JSON.stringify("Message accepted!"),
    };
  })
  .catch(error => {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    };
  });
  return retorno;
  
};





module.exports.responderWorker = async (event) => {
  console.log(JSON.stringify(event));

  var message = JSON.parse(event?.Records?.[0]?.body);
  return Promise.resolve(message)
  .then(async body => {
    var url = `https://ml.atualise.com:3030/call/generator`;
    var dados = {data:[body?.text_message]}
    console.log("event_id");
    var pergunta = axios.post(url, dados, {headers:{"Content-Type": "application/json"}});
    return pergunta.then(get => {
        var event_id = get?.data?.event_id;
        console.log(event_id);
        return Promise.resolve(event_id);
    })
    .catch(err =>{
      console.log(err);
      return Promise.reject(err);
    });
  })
  .then(async event_id => {
    var url = `https://ml.atualise.com:3030/call/generator/${event_id}`;
    console.log("retorno");
    var resposta = axios.get(url, {}, {headers:{"Content-Type": "application/json"}});
    return resposta.then(get => {
      var texto = get?.data;
      console.log(texto);
      return Promise.resolve(texto);
    })
    .catch(err =>{
      console.log(err);
      return Promise.reject(err);
    });
    
  })
  .then(resposta =>{
      var evento = resposta.split("data:");
      var retorno = "";
      for(var i in evento){
          var trecho = evento[i].trim();
          if(trecho.startsWith('[') && trecho.endsWith(']')){
              trecho = trecho.replace(/\\u([0-9a-fA-F]{4})/g, (m,cc)=>String.fromCharCode("0x"+cc));
              trecho = trecho.replace('["', '').replace('"]', '').replace('**Rewrite**', '').replace(/\r?\n|\r/g, "").trim();
              var retorno = trecho;
          }
      }
      console.log("formata");
      return Promise.resolve(retorno);
  })
  .then(async resposta => {
      //console.log(resposta);
      var url = `https://api.zapiador.com/whatsapp/v1/send`;
      var dados = {
          "to_phone":message?.from_id,
          "text_message":resposta,
          "reply_id": message?.message_id
      }
      console.log("envio mensagem");
      var pergunta = axios.post(url, dados, {headers:{"Content-Type": "application/json"}});
      return pergunta.then(get => {  
        console.log(get?.data);
          return Promise.resolve(true);
      })
      .catch(err =>{
        console.log(err);
        return Promise.reject(err);
      });
    })
  .then((retorno)=>{
    return {
      statusCode:200,
      body: JSON.stringify(retorno),
    }
  })
  .catch(erro =>{
    console.log(erro);
    return {
      statusCode:500,
      body: JSON.stringify(erro),
    }
  });
  
};




const sendMessage = async (business_phone_number_id, message_to, message_text, reply_id) => {
  console.log("Respondeu a mensagem");  
  
  var data = {
    messaging_product: "whatsapp",
    to: message_to,
    recipient_type: "individual",
    type: "text",
    text: { body: message_text },
  };
  
  var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`;

  var result = await axios.post(url, data, {headers: {Authorization: `Bearer ${GRAPH_API_TOKEN}`}});
  return result;
};





module.exports.send_message = async (event) => {
  console.log(JSON.stringify(event));
  var body = JSON.parse(event.body);
  
  const message_text = body?.text_message;
  const message_to = body?.to_phone;
  const reply_id = body?.reply_id;
  const business_phone_number_id = "441867515682175";
  // Identificação do número de telefone: 441867515682175
  // Identificação da conta do WhatsApp Business: 449305298271967

  var retorno = await sendMessage(business_phone_number_id, message_to, message_text, reply_id);
  console.log(retorno.data);


  var data = {
    "message_id":retorno?.data?.messages?.[0]?.id,
    "from_id":business_phone_number_id,
    "from_name":"Atualise Serviços Digitais",
    "from_phone": "5511989822151",
    "to_id":retorno?.data?.contacts?.[0]?.wa_id,
    "to_name":"",
    "to_phone": retorno?.data?.contacts?.[0]?.input,
    "window_id":"",
    "text_message":message_text,
    "document_message":"",
    "created_at":formatters.formatTimestampToDatetime(Date.now()),
  };

  
  var retorno = Promise.resolve(data)
  .then(saveToDB)
  .then(()=>{
    return {
      statusCode:200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  })
  .catch(error => {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error,
      }),
    };
  });
  return retorno;
};




const sendTemplateMessage = async (business_phone_number_id, message_to, message_template, reply_id) => {
  console.log("Respondeu a mensagem");  
  
  var data = {
    messaging_product: "whatsapp",
    to: message_to,
    type: "template", 
    template: { 
      name: message_template, 
      language: { 
        code: "pt_BR" 
      } 
    } 
  };  
  var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`;

  var result = await axios.post(url, data, {headers: {Authorization: `Bearer ${GRAPH_API_TOKEN}`}});
  return result;
};





module.exports.send_message_template = async (event) => {
  console.log(JSON.stringify(event));
  var body = JSON.parse(event.body);
  
  const message_text = body?.text_message;
  const message_to = body?.to_phone;
  const reply_id = body?.reply_id;
  const business_phone_number_id = "441867515682175";
  // Identificação do número de telefone: 441867515682175
  // Identificação da conta do WhatsApp Business: 449305298271967

  const template = "lembrete_boleto_pendente";
  var retorno = await sendTemplateMessage(business_phone_number_id, message_to, template, reply_id);
  //console.log(retorno.data);
  const template_text = "Lembrete de boleto aguardando pagamento\
    Oi, tudo bem?\
    Estamos entrando em contato para relembrá-lo que o boleto para o curso ainda encontra-se em aberto. Lembre-se de pagar antes do vencimento para evitar a suspensão do contrato.\
    Estamos aqui para te ajudar caso tenha dúvidas.";

  var data = {
    "message_id":retorno?.data?.messages?.[0]?.id,
    "from_id":business_phone_number_id,
    "from_name":"Atualise Serviços Digitais",
    "from_phone": "5511989822151",
    "to_id":retorno?.data?.contacts?.[0]?.wa_id,
    "to_name":"",
    "to_phone": retorno?.data?.contacts?.[0]?.input,
    "window_id":"",
    "text_message":template_text,
    "document_message":"",
    "created_at":formatters.formatTimestampToDatetime(Date.now()),
  };

  
  var retorno = Promise.resolve(data)
  .then(saveToDB)
  .then(()=>{
    return {
      statusCode:200,
      body: JSON.stringify("Message accepted!"),
    };
  })
  .catch(error => {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    };
  });
  return retorno;
};






// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
module.exports.get_webhook = async (event) => {
  console.log(event);
  const mode = event.queryStringParameters["hub.mode"];
  const token = event.queryStringParameters["hub.verify_token"];
  const challenge = event.queryStringParameters["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    console.log("Webhook verified successfully!");
    return {
        "statusCode":200,
        "body":challenge
    }
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    return {
        "statusCode":403,
        "body":challenge
    }
  }
};


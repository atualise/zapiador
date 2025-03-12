"use strict";

const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const sqs = new SQSClient({region: "us-east-1"});
const { 
  formatBooleansReturn, 
  formatTimestampToDatetime,
   closeConnection,
  openConnection,
  _searchClientByTelefone,
  _searchProductByCliente,
  _searchContractByParams,
  _searchClientByParams,
  _searchProductByParams,
  _searchContractByClienteName,
  _searchFunilsByEventType,
  _searchUsuariosByIds,
  cmd_ADD_FUNIL,
  cmd_FORWARD_USER,
  cmd_ADD_TAG,
  cmd_REMOVE_FUNIL,
  cmd_MOVE_FUNIL_POSITION,
  cmd_REMOVE_TAG,
  cmd_FORWARD_GROUP,
  cmd_SEND_MESSAGE_TEMPLATE,
  cmd_SEND_MESSAGE_TEXT,
  cmd_SEND_MESSAGE_DOCUMENT,
  _sendDataToWebhook,
  _moveClientPositionFunil,
  _addActivityHistory

 } = require("./utils-robo");


module.exports.execucao_robo = async (event) => {
  console.log(JSON.stringify(event));
  
  if(event?.Records?.[0]){
    var data = JSON.parse(event?.Records?.[0]?.body);
    

    var command_list = [];
    // define sequencia de ações que serão executadas e coloca na lista de comandos
    const rt = data?.return_type;
    const cs = data?.current_step;
    
    if((cs === null) && rt === "ADD_FUNIL"){
      command_list.push("ADD_FUNIL");
    }

    if(cs && rt === "SEND_MESSAGE_TEMPLATE"){
      command_list.push("SEND_MESSAGE_TEMPLATE");
    }

    if(cs && rt === "SEND_MESSAGE_FORM"){
      command_list.push("SEND_MESSAGE_FORM");
    }


    if(cs && rt === "FORWARD_USER"){
      command_list.push("FORWARD_USER");
    }


    if(cs && rt === "ADD_TAG"){
      command_list.push("ADD_TAG");
    }



    if(cs && rt === "WAIT_SCHEDULER"){
      command_list.push("WAIT_SCHEDULER");
    }


    
    
    // executa ação que estiver na lista de comandos
    var connection = await openConnection();

    for(var i in command_list){
      var te = command_list[i];
      
      
      if(te === "ADD_FUNIL"){
        console.log("Rodou add funil");
        await cmd_ADD_FUNIL(data, connection);
        data.return_type = "ADDED_FUNIL";
      }

      if(te === "FORWARD_USER"){
        console.log("rodou direcionamento para usuario");
        await cmd_FORWARD_USER(data, connection);
        data.return_type = "FORWARDED_USER";
      }

      if(te === "ADD_TAG"){
        console.log("rodou add tag");
        await cmd_ADD_TAG(data, connection);
        data.return_type = "ADDED_TAG";
      }


      if(te === "REMOVE_FUNIL"){
        // tabela cliente_funil_history define status INACTIVE
        console.log("rodou remove funil");
        data.return_type = "REMOVED_FUNIL";
      }

      if(te === "MOVE_FUNIL_POSITION"){
        // tabela cliente_funil_history define status INACTIVE
        console.log("rodou move funil");
        data.return_type = "MOVED_FUNIL_POSITION";
      }
  

      if(te === "REMOVE_TAG"){
        // tabela cliente_tag_history define status INACTIVE
        console.log("rodou remove tag");
        data.return_type = "REMOVED_TAG";
      }

      if(te === "FORWARD_GROUP"){
        // tabela user_client_messages cria a relação entre o cliente e todos os usuario
        console.log("rodou forward group");
        data.return_type = "FORWARDED_GROUP";
      }

      if(te === "SEND_MESSAGE_TEMPLATE"){
        // chama endpoint para disparar template para destinatário
        console.log("rodou send message template");
        data.return_type = "SENT_MESSAGE_TEMPLATE";
      }

      if(te === "SEND_MESSAGE_FORM"){
        // chama endpoint para disparar formulário para destinário
        console.log("rodou send message form");
        data.return_type = "SENT_MESSAGE_FORM";
      }

      if(te === "SEND_MESSAGE_TEXT"){
        // chama endpoint para disparar mensagem de texto para destinatario
        console.log("rodou send message text");
        data.return_type = "SENT_MESSAGE_TEXT";
      }

      if(te === "SEND_MESSAGE_DOCUMENT"){
        // chama endpoint para disparar mensagem com documento em anexo
        console.log("rodou send message document");
        data.return_type = "SENT_MESSAGE_DOCUMENT";
      }

    }

    data.executed_at = formatTimestampToDatetime(new Date);
    data = await _addActivityHistory(data, connection);
    data = await _moveClientPositionFunil(data, connection);
    
    console.log(data);
    // envia comando executado para webhook continuar fluxo
    if(data?.next_step){
      await _sendDataToWebhook(data);
    }
    closeConnection(connection);       
  }

  

  return {
    statusCode:200,
    body: JSON.stringify("Message accepted!"),
  };
  
};




module.exports.robo_command = async (event) => {
  console.log(JSON.stringify(event));
  var body = JSON.parse(event?.body);
    
  var command_message = {
    is_contract_active: false,
    is_contract_pendente: false,
    is_contract_overdue: false,
    is_contract_churn: false,
    negocio_id: null,
    client_id: null,
    message_id: null,
    contract_id: null,
    sender_id: null,
    users_ids: null,
    window_start: null,
    products_ids: null,
    created_at: formatTimestampToDatetime(new Date),
    contract_status: null,
    client_telefone: null,
    event_type: null,
    funils_list: [],
    funils_steps: [],
    executed_at: null,
    return_type: null,
    next_step: null,
    current_step: null,
    current_step_value: null,
  };

  var connection = await openConnection();
  var retorno = Promise.resolve(body)
  .then(async (body)=>{
    // Mensagem recebida do Whatsapp
    if(body?.sender_telefone && body?.message_id){
      command_message.event_type = 'MESSAGE_RECEIVED';
      command_message.message_id = body?.message_id;
      command_message.sender_id = body?.sender_telefone;
      command_message = await _searchClientByTelefone(command_message,connection);
      command_message = await _searchProductByCliente(command_message,connection);
      command_message = await _searchContractByClienteName(command_message,connection);
    }


    // Contrato mudança status
    if(body?.cliente_email && body?.assinatura_id && body?.produto_nome){
      command_message.event_type = 'CONTRACT_CHANGE';
      command_message = await _searchContractByParams(command_message, body,connection);

    }

    // Carrinho abandonado
    if(body?.cliente_email && body?.produto_id){
      command_message.event_type = 'ABANDONED_CART';
      command_message = await _searchClientByParams(command_message, body,connection);
      command_message = await _searchProductByParams(command_message, body,connection);
      command_message = await _searchContractByClienteName(command_message,connection);
    }


    // Retorno da execucao do robo
    if(body?.return_type && body?.current_step ){
      command_message = body;
      command_message.event_type = 'EXECUTED_COMMAND';
      command_message.created_at = formatTimestampToDatetime(new Date);
    }

    return Promise.resolve(command_message);
  })  
  .then(async (data)=>{
    if(data.event_type !== 'EXECUTED_COMMAND'){
      // busca robos habilitados para o gatilho
     //data = await _searchRobosByEventType(data, connection);
      // busca funis habilitados para os robos
      data = await _searchFunilsByEventType(data, connection);
      // busca usuarios habilitados para os robos
      // data = await _searchUsuariosByIds(data, connection);
    }
   
    return Promise.resolve(data);
  })
  .then((data)=>{
    // Formatar boleanos
    var data = formatBooleansReturn(data, connection);
    return Promise.resolve(data);
  })
  .then(async (data)=>{
    closeConnection(connection);
    // Envio para a fila
    if(data.current_step){
      await sqs.send(new SendMessageCommand({
        QueueUrl: process.env.QUEUE_URL,
        MessageBody: JSON.stringify(data),
      }));
    }
    return Promise.resolve(data);
  })
  .then((data)=>{
    console.log(data);
    return {
      statusCode:200,
      body: JSON.stringify("Message accepted!"),
    };

  })
  .catch(error =>{
    console.log(error);
    return {
      statusCode:500,
      body: JSON.stringify(error),
    };
  });  

  return retorno;

};




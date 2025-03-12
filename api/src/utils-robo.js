"use strict";

const { v4: uuidv4 } = require('uuid');
//const axios = require('axios');
const mariadb = require('mariadb');
const axios = require('axios');

const db_config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
  
var connection = null;

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};


module.exports.formatTimestampToDatetime = (input) => {
    let retorno = "";
    if(input){
        let d = new Date(input);
        let year = d.getUTCFullYear();
        let month = d.getUTCMonth()+1;
        let day = d.getUTCDate();
        let hour = d.getUTCHours();
        let minute = d.getUTCMinutes();
        let second = d.getUTCSeconds();
        retorno = year + "-" + (month<10?"0"+month:month) + "-" + (day<10?"0"+day:day) + " "+(hour<10?"0"+hour:hour) + ":"+(minute<10?"0"+minute:minute) + ":"+(second<10?"0"+second:second);
    } else {
        retorno = null;
    }
    return retorno;
};




module.exports.openConnection = () => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Abrindo nova conexao...");
            var conn = await mariadb.createConnection({
                host: db_config.host,
                user: db_config.user,
                password: db_config.password,
                database: db_config.database,
                pipelining: true,
                connectTimeout: 10000,
                socketTimeout: 10000,
            });
            connection = conn;
            //return resolve(await setDefaultParamsOnConnection(connection));
            return resolve(conn);

        } catch (err) {
            console.error(err);
            return reject(err);
        }        
    });
};
  
  

module.exports.closeConnection = (conn) => {
    if(conn){
        console.log("Fechando conexao com banco");
        conn.end();
        return true;
    } else {
        return false;
    }

};



module.exports.searchRobosByEventType = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            SELECT
                f.id,
                f.gatilho_execucao
            FROM zapiador.funils f
            WHERE f.gatilho_execucao LIKE "${data.event_type}" 
                AND f.negocio_id LIKE "${data.negocio_id}"
                AND f.status LIKE "ACTIVE"
        `;
        //console.log(query);
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};



module.exports.searchUsuariosByIds = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            SELECT
            u.id,
            u.user_nome
            FROM zapiador.users u
            WHERE u.id IN ("${ data.user_list.join(',') }") 
            AND u.status LIKE "ACTIVE"
            AND u.negocio_id LIKE "${ data.negocio_id }"
        `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};





module.exports.searchFunilsByEventType = async (params, connection)=>{
     var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            SELECT
                f.id,
                f.funil_nome
            FROM zapiador.funils f
            WHERE f.gatilho_execucao LIKE "${ data.event_type }" 
                AND f.status LIKE "ACTIVE" 
                AND f.negocio_id LIKE "${ data.negocio_id }"
        `;
        console.log(query);
        return Promise.resolve(query);
    })
    .then(async q => {
        var result = await connection.query(q);
        return Promise.resolve(result);      
    });
    
    return retorno;
};






module.exports.searchFunilStepsByFunil = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            SELECT
                fs.id,
                fs.funil_id,
                sequence,
                type,
                CASE WHEN fs.type LIKE "FORWARD_USER" THEN JSON_OBJECT("id", u.id, "nome", u.user_nome) END FORWARD_USER,
                CASE WHEN fs.type LIKE "SEND_MESSAGE_TEMPLATE" THEN JSON_OBJECT("id", te.id, "nome", template_nome) END SEND_MESSAGE_TEMPLATE,
                CASE WHEN fs.type LIKE "SEND_MESSAGE_FORM" THEN JSON_OBJECT("id", fo.id, "nome", formulario_nome) END SEND_MESSAGE_FORM,
                CASE WHEN fs.type LIKE "ADD_TAG" THEN JSON_OBJECT("id", ta.id, "nome", tag_nome) END ADD_TAG,
                CASE WHEN fs.type LIKE "WAIT_SCHEDULER" THEN JSON_OBJECT("id", fs.scheduler_id, "nome", s.scheduler_nome) END WAIT_SCHEDULER
            FROM zapiador.funils_steps fs
            LEFT JOIN zapiador.funils f ON (f.id = fs.funil_id)
            LEFT JOIN zapiador.templates te ON (te.id = fs.template_id)
            LEFT JOIN zapiador.tags ta ON (ta.id = fs.tag_id)
            LEFT JOIN zapiador.formularios fo ON (fo.id = fs.form_id)
            LEFT JOIN zapiador.users u ON (u.id = fs.user_id)
            LEFT JOIN zapiador.schedulers s ON (s.id = fs.scheduler_id)
            WHERE f.id LIKE "${ data.funil_id }" AND f.negocio_id LIKE "${ data.negocio_id }"
            ORDER BY fs.sequence ASC
        `;
        //console.log(query);
        return Promise.resolve(query);
    })
    .then(async q => {
        var result = await connection.query(q);
        return Promise.resolve(result);      
    });
    
    return retorno;
};







module.exports.addClientToFunil = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            REPLACE INTO zapiador.cliente_funil_history
                (id, cliente_id, funil_id, negocio_id, funil_step_id, updated_at)
            VALUES 
                ("${uuidv4()}", "${data.client_id}", "${data.funil_list[0]}", "${data.negocio_id}", "0", "${this.formatTimestampToDatetime((new Date()).toISOString())}")
        `;
        //console.log(query);
        return Promise.resolve(query);
    })
    .then(async q => {
        await connection.beginTransaction();
        var result = await connection.query(q);
        await connection.commit();
        return Promise.resolve(result);      
    });
    
    return retorno;
};





module.exports.addClientToTag = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            REPLACE INTO zapiador.cliente_tag_history
                (id, cliente_id, tag_id, negocio_id, status, updated_at)
            VALUES 
                ("${uuidv4()}", "${data.client_id}", "${data.tag_id}", "${data.negocio_id}", "ACTIVE", "${this.formatTimestampToDatetime((new Date()).toISOString())}")
        `;
        //console.log(query);
        return Promise.resolve(query);
    })
    .then(async q => {
        await connection.beginTransaction();
        var result = await connection.query(q);
        await connection.commit();
        return Promise.resolve(result);      
    });
    
    return retorno;
};





module.exports.addClientToUser = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            REPLACE INTO zapiador.cliente_user_history
                (id, cliente_id, user_id, negocio_id, updated_at)
            VALUES 
                ("${uuidv4()}", "${data.client_id}", "${data.user_id}", "${data.negocio_id}", "${this.formatTimestampToDatetime((new Date()).toISOString())}")
        `;
        //console.log(query);
        return Promise.resolve(query);
    })
    .then(async q => {
        await connection.beginTransaction();
        var result = await connection.query(q);
        await connection.commit();
        return Promise.resolve(result);      
    });
    
    return retorno;
};









module.exports.searchContractByParams = async (params, connection)=>{
     var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            SELECT
                aa.licence_id,
                aa.assinatura_id,
                v.cliente_nome,
                v.cliente_email,
                v.cliente_telefone,
                v.cliente_cpf,
                v.produto_id,
                aa.tipo_intervalo,
                aa.assinatura_contagem,
                aa.status_renovacao,
                aa.produto
            FROM analytics.AuxAssinaturas aa
            LEFT JOIN eduzz.vendas v ON (v.assinatura_id = aa.assinatura_id)
            WHERE 
                aa.cliente_email LIKE "${data.client_email}" 
                OR aa.assinatura_id LIKE "${data.contract_id}"
            GROUP BY aa.assinatura_id
      `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};







module.exports.searchClientByParams = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
        SELECT 
            cliente_nome,
            cliente_email,
            cliente_telefone,
            cliente_cpf
        FROM eduzz.vendas 
        WHERE         
            cliente_email like "%${data.client_email}%"     
            OR cliente_nome like "%${data.client_name}%"
            OR cliente_telefone like "%${data.client_telefone}%"             
        GROUP BY cliente_nome, cliente_email, cliente_telefone
      `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};






module.exports.searchClientByTelefone = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
        SELECT 
            cliente_nome,
            cliente_email,
            cliente_telefone,
            cliente_cpf
        FROM eduzz.vendas 
        WHERE 
            cliente_telefone like "%${data.client_telefone}%" 
        GROUP BY cliente_nome, cliente_email, cliente_telefone
      `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};



module.exports.searchProductByParams = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
        SELECT 
            v.produto_id,
            fp.nome_familia
        FROM eduzz.vendas v
        LEFT JOIN eduzz.familia_produtos fp ON (fp.produto_id = v.produto_id) 
        WHERE 
            v.produto_nome like "%${data.product_name}%"
            OR v.produto_id like "%${data.product_id}%" 
        GROUP BY v.produto_id
      `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};





module.exports.searchProductByCliente = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
        SELECT 
            v.produto_id,
            fp.nome_familia
        FROM eduzz.vendas v
        LEFT JOIN eduzz.familia_produtos fp ON (fp.produto_id = v.produto_id) 
        WHERE v.cliente_nome LIKE "%${data.client_name}%" OR v.cliente_email LIKE "%${data.client_email}%" 
        GROUP BY v.produto_id
      `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};






module.exports.searchContractByName = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `   
            SELECT
                v.assinatura_id,
                aa.status_renovacao,
                aa.licence_id
            FROM eduzz.vendas v 
            LEFT JOIN analytics.AuxAssinaturas aa ON (aa.assinatura_id = v.assinatura_id)
            WHERE v.cliente_nome LIKE "%${data.client_name}%" OR v.cliente_email LIKE "%${data.client_email}%" 
            GROUP BY v.assinatura_id
        `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};




module.exports._searchClientByTelefone = async (command_message,connection)=>{
    return await this.searchClientByTelefone({
      client_telefone: command_message.sender_id
    }, connection)
    .then((cliente)=>{
      //console.log(cliente);
      command_message.client_name = cliente?.[0]?.cliente_nome;
      command_message.client_email = cliente?.[0]?.cliente_email;
      command_message.client_telefone = cliente?.[0]?.cliente_telefone;
      command_message.client_id = cliente?.[0]?.cliente_cpf;
      return command_message;
    });
  };
  
  
  module.exports._searchProductByCliente = async (command_message,connection)=>{
    return await this.searchProductByCliente({
      client_name: command_message.client_name,
      client_email: command_message.client_email,
      client_telefone: command_message.client_telefone
    }, connection)
    .then((produto)=>{
      //console.log(produto);
      command_message.products_ids = [produto?.[0]?.produto_id];
      return command_message;
    })  
  };
  
  
  
  module.exports._searchContractByParams = async (command_message, body,connection)=>{
    return await this.searchContractByParams({
      client_email: body?.cliente_email,
      contract_id: body?.assinatura_id
    }, connection)
    .then((contrato)=>{
      //console.log(contrato);
      command_message.client_name = contrato?.[0]?.cliente_nome;
      command_message.client_email = contrato?.[0]?.cliente_email;
      command_message.client_telefone = contrato?.[0]?.cliente_telefone;
      command_message.client_id = contrato?.[0]?.cliente_cpf;
      command_message.contract_id = contrato?.[0]?.assinatura_id;
      command_message.contract_status = contrato?.[0]?.status_renovacao;
      command_message.products_ids = [contrato?.[0]?.produto_id];
      command_message.negocio_id = contrato?.[0]?.licence_id;
      return command_message;
    });
  };
  
  
  
  module.exports._searchClientByParams = async (command_message, body,connection)=>{
    return await this.searchClientByParams({
      client_name: body?.cliente_nome,
      client_email: body?.cliente_email,
      client_telefone: body?.cliente_telefone
    }, connection)
    .then((cliente)=>{
      //console.log(cliente);
      command_message.client_name = cliente?.[0]?.cliente_nome;
      command_message.client_email = cliente?.[0]?.cliente_email;
      command_message.client_telefone = cliente?.[0]?.cliente_telefone;
      command_message.client_id = cliente?.[0]?.cliente_cpf;
      return command_message;
    });
  };
  
  
  
  module.exports._searchProductByParams = async (command_message, body,connection)=>{
    return await this.searchProductByParams({
      product_id: body?.produto_id,
      product_name: body?.produto_nome,
    }, connection)
    .then((produto)=>{
      //console.log(produto);
      command_message.products_ids = [produto?.[0]?.produto_id];
      return command_message;
    })  
  };
  
  
  
  module.exports._searchContractByClienteName = async (command_message,connection)=>{
    return await this.searchContractByName({
      client_name: command_message.client_name,
      client_email: command_message.client_email,
    }, connection)
    .then((contrato)=>{
      //console.log(contrato);
      command_message.contract_id = contrato?.[0]?.assinatura_id;
      command_message.contract_status = contrato?.[0]?.status_renovacao;
      command_message.negocio_id = contrato?.[0]?.licence_id;
      return command_message;
    }) 
  };
  
  
  
  module.exports._searchRobosByEventType = async (data, connection)=>{
    return await this.searchRobosByEventType({
      event_type: data.event_type,
      negocio_id: data.negocio_id
    }, connection)
    .then((robo)=>{
      //console.log(robo);
      data.funils_list = robo;
      return data;
    });
  };
  
  
  module.exports._searchFunilStepsByFunil = async (data, connection)=>{
    return await this.searchFunilStepsByFunil({
      funil_id: data?.funils_list?.[0]?.id,
      negocio_id: data.negocio_id
    }, connection)
    .then((steps)=>{
      //console.log(steps);
      data.funils_steps = steps;
      return data;
    });
  };
  
  
  module.exports._searchFunilsByEventType = async (data, connection)=>{
    return await this.searchFunilsByEventType({
      event_type: data.event_type,
      negocio_id: data.negocio_id
    }, connection)
    .then(async (funil)=>{
      console.log(funil);
      data.funils_list = funil;
      data = await this._searchFunilStepsByFunil(data, connection);
      return data;
    });
  };
  
  
  module.exports._searchUsuariosByIds = async (data, connection)=>{
    return await this.searchUsuariosByIds({
      user_list: data.robos_list.filter(el=> el.user_id !== null ).map(el => el.user_id ),
      negocio_id: data.negocio_id
    }, connection)
    .then((usuario)=>{
      //console.log(usuario);
      data.users_list = usuario;
      return data;
    });
  };
  





module.exports.addActivityHistory = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            INSERT INTO zapiador.activity_history
                (id, cliente_id, event_type, negocio_id, funil_id, updated_at)
            VALUES 
                ("${uuidv4()}", "${data.client_id}", "${data.event_type}", "${data.negocio_id}", "${data.funil_id}", "${data.executed_at}")
        `;
        //console.log(query);
        return Promise.resolve(query);
    })
    .then(async q => {
        await connection.beginTransaction();
        var result = await connection.query(q);
        await connection.commit();
        return Promise.resolve(result);      
    });
    
    return retorno;
};






  module.exports._addActivityHistory = async (data, connection)=>{
    return await this.addActivityHistory({
      negocio_id: data.negocio_id,
      client_id: data.client_id,
      event_type: data.return_type,
      funil_id: data?.funils_list?.[0]?.id,
      executed_at: data?.executed_at
    }, connection)
    .then((cmd)=>{
      //console.log(cmd);
      return data;
    });
  
  };



  module.exports.cmd_ADD_FUNIL = async (data, connection)=>{
    return await this.addClientToFunil({
      funil_list: data.funils_list.map(el => el.id ),
      negocio_id: data.negocio_id,
      client_id: data.client_id
    }, connection)
    .then((cmd)=>{
      //console.log(cmd);
      return data;
    });
  
  };
  
  module.exports.cmd_FORWARD_USER = async (data, connection)=>{
    if(data?.current_step_value){
        return await this.addClientToUser({
            user_id: data?.current_step_value,
            negocio_id: data.negocio_id,
            client_id: data.client_id
        }, connection)
        .then((cmd)=>{
            //console.log(cmd);
            return data;
        });
    } else {
        return null;
    }
  };
  
  module.exports.cmd_ADD_TAG = async (data, connection)=>{
    if(data?.current_step_value){
      return await this.addClientToTag({
        negocio_id: data.negocio_id,
        client_id: data.client_id,
        tag_id: data?.current_step_value,
      }, connection)
      .then((cmd)=>{
        //console.log(cmd);
        return data;
      });   
    } else {
        return null;
    }
  };
  
  module.exports.cmd_REMOVE_FUNIL = async (data)=>{
  
    
  };
  
  module.exports.cmd_MOVE_FUNIL_POSITION = async (data, connection)=>{
  // identifica a posição atual do usuário no funil
  // verfica a próxima ação a ser executada
  // retorna a lista de funções que deve executar
    
  };
  
  module.exports.cmd_REMOVE_TAG = async (data)=>{
  
    
  };
  
  module.exports.cmd_FORWARD_GROUP = async (data)=>{
  
    
  };
  
  module.exports.cmd_SEND_MESSAGE_TEMPLATE = async (data)=>{
  
    
  };
  
  module.exports.cmd_SEND_MESSAGE_TEXT = async (data)=>{
  
    
  };
  
  module.exports.cmd_SEND_MESSAGE_DOCUMENT = async (data)=>{
  
    
  };
  
  


module.exports.searchClientePosicaoRobo = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `   
            SELECT
            ch.funil_id,
            ch.funil_step_id
            FROM zapiador.cliente_funil_history ch
            WHERE ch.cliente_id LIKE "${data.client_id}" AND ch.funil_id LIKE "${data.funil_id}" AND status LIKE "ACTIVE"
        `;
      return Promise.resolve(query);
    })
    .then(async q => {
      var result = await connection.query(q);
      return Promise.resolve(result);      
    });
    return retorno;
};

  


module.exports._searchClientePosicaoRobo = async (data, connection)=>{
    return await this.searchClientePosicaoRobo({
      client_id: data?.client_id,
      funil_id: data?.funils_list?.[0]?.id
    }, connection)
    .then((posicao)=>{
        //console.log(posicao);
        if((posicao.length == 0) || posicao?.[0]?.funil_step_id === "0"){
            data.current_step = data.funils_steps.filter(el=>el.sequence === 0).map(el=>el.id)?.[0];
            data.return_type = data.funils_steps.filter(el=>el.sequence === 0).map(el=>el.type)?.[0];
            data.next_step = data.funils_steps.filter(el=>el.sequence === 1).map(el=>el.id)?.[0];
            
        } else {
            var posA = data.funils_steps.filter(el=>el.id === data.current_step).map(el=>el.sequence)?.[0];
            var posB = data.funils_steps.filter(el=>el.sequence === (posA+1)).map(el=>el.id)?.[0];
            data.current_step = posicao?.[0]?.funil_step_id;
            data.next_step = posB ? posB : false;
        }
      return data;
    });
  };
  





  module.exports.moveClientPositionFunil = async (params, connection)=>{
    var retorno = Promise.resolve(params)
    .then(data => {
        var query = `
            REPLACE INTO zapiador.cliente_funil_history
                (id, cliente_id, funil_id, funil_step_id, negocio_id, updated_at)
            VALUES 
                ("${uuidv4()}", "${data.client_id}", "${data.funil_id}", "${data.funil_step_id}", "${data.negocio_id}", "${this.formatTimestampToDatetime((new Date()).toISOString())}")
        `;
        //console.log(query);
        return Promise.resolve(query);
    })
    .then(async q => {
        await connection.beginTransaction();
        var result = await connection.query(q);
        await connection.commit();
        return Promise.resolve(result);      
    });
    
    return retorno;
};




module.exports._sendDataToWebhook = async (data)=>{
    try{
        return await axios.post(
            "https://api.zapiador.com/robo/v1/webhook", 
            data, 
            { headers: { "Content-Type": "application/json"}}
        );
    }catch(err){
        console.log(err);
        return null;
    }
};


module.exports._moveClientPositionFunil = async (data, connection)=>{
    return await this.moveClientPositionFunil({
        negocio_id: data.negocio_id,
        client_id: data.client_id,
        funil_id: data.funils_list?.[0].id,
        funil_step_id: data.current_step,
      }, connection)
      .then((cmd)=>{
        //console.log(cmd);
        return data;
      }); 
};






module.exports._searchNexCommandFunil = async (data, connection)=>{
  if(data?.event_type === "EXECUTED_COMMAND"){
      var posA = data?.funils_steps?.filter(el=>el.id === data?.current_step)?.[0];
      var posN = data?.funils_steps?.filter(el=>el.sequence === (posA?.sequence+1))?.[0];
      
      if( posN === undefined){
          data.current_step = false;
          data.next_step = false;
      }else{
          data.return_type = posN?.type;
          data.current_step = posN?.id;
          data.next_step = data?.funils_steps?.filter(el=>el.sequence === (posN?.sequence+1))?.map(el => el.id)?.[0];
          data.current_step_value = posN[posN.type]?.id;
      }
    }

    return data;
};



module.exports.formatBooleansReturn = async (data, connection)=>{
    data.is_contract_active = ["VENCIMENTO_FUTURO", "RENOVADO"].contains(data?.contract_status) ? true : false;
    data.is_contract_pendente = ["PENDENTE_RENOVACAO"].contains(data?.contract_status) ? true : false;
    data.is_contract_overdue = ["INADIMPLENTE"].contains(data?.contract_status) ? true : false;
    data.is_contract_churn = ["CHURN"].contains(data?.contract_status) ? true : false;
    

    // encontra a posição atual do cliente
    data = await this._searchClientePosicaoRobo(data, connection);

    // escolhe o próximo passo para executar
    data = await this._searchNexCommandFunil(data, connection);

    // coloca o comando para executar na mensagem


    return Promise.resolve(data);
};
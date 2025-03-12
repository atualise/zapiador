
const mariadb = require('mariadb');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const db_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}


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
              connectTimeout: 5000,
              socketTimeout: 1000,
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


const getTimestamp = () => {
  const dt = new Date();
  return new Date().toJSON().slice(0, 19).replace('T', ' ');
}


exports.contacts_list_all = async (event) => {
  console.log(JSON.stringify(event));
  if(event && event.isBase64Encoded && event.isBase64Encoded == true)
    var body = event.body;
  
  var connection = await openConnection();
  var retorno = Promise.resolve(body)
  .then(async body => {
    var query = "\
      SELECT \
        c.*\
      FROM (\
        SELECT\
          from_id as id,\
          from_phone as channelId,\
          from_name as name,\
          '' as profile_pic,\
          '' as status,\
          '' as mood,\
          text_message as lastMessage,\
          '' as unreadMessage,\
          MAX(created_at) as lastMessageTime,\
          false as favourite\
        FROM "+db_config.database+".whatsapp\
        GROUP BY from_phone\
        HAVING id IS NOT NULL\
        ORDER BY created_at DESC\
      ) as c\
      ORDER BY c.lastMessageTime DESC\
    ";
    
    return Promise.resolve(query);
  })
  .then(async q => {
    //console.log("Executando query", q);
    return (new Promise(async (resolve, reject) => {
      await connection.beginTransaction();
      try{
        var result = await connection.query(q);
        await connection.commit();
        return resolve(result);
      }catch(e){
        await connection.rollback();
        return reject(e);
      }
    }));
  })
  .then((data)=>{
    return {
      statusCode:200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  })
  .finally(()=>closeConnection(connection))
  .catch(error => {
    console.log(error);
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





exports.contact_get_conversation = async (event) => {
  console.log(JSON.stringify(event));
  var body = event.body;
  var params = event.queryStringParameters;
  var connection = await openConnection();
  var retorno = Promise.resolve(body)
  .then(async body => {
    var query = "\
      SELECT\
        'text' as messageType,\
        (CASE WHEN from_id = "+params?.channelId+" THEN 'received' ELSE 'sent' END) as type,\
        text_message as message,\
        created_at as sentAt\
      FROM "+db_config.database+".whatsapp\
      WHERE from_id = "+params?.channelId+" OR to_id = "+params?.channelId+"\
      ORDER BY created_at ASC\
    ";
    
    return Promise.resolve(query);
  })
  .then(async q => {
    //console.log("Executando query", q);
    return (new Promise(async (resolve, reject) => {
      await connection.beginTransaction();
      try{
        var result = await connection.query(q);
        await connection.commit();
        var retorno = {
          id:params?.channelId,
          conversationData:result
        };
        
        return resolve(result);
      }catch(e){
        await connection.rollback();
        return reject(e);
      }
    }));
  })
  .then((data)=>{
    return {
      statusCode:200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(data),
    };
  })
  .finally(()=>closeConnection(connection))
  .catch(error => {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        error,
      }),
    };
  });
  return retorno;

};



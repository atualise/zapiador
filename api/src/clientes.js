
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
              connectTimeout: 15000,
              socketTimeout: 15000,
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


exports.clientes_list_all = async (event) => {
  console.log(JSON.stringify(event));
  if(event && event.isBase64Encoded && event.isBase64Encoded == true)
    var body = event.body;
  
  var connection = await openConnection();
  var retorno = Promise.resolve(body)
  .then(async body => {
    var query = "\
      SELECT \
        a.assinatura_id as id,\
        v.cliente_nome as name,\
        '' as profile_pic,\
        a.cliente_email as email,\
        JSON_ARRAY(JSON_OBJECT('phone', v.cliente_telefone, 'label','')) as phones,\
        a.status_renovacao as designation,\
        'False' as starred,\
        'False' as frequent,\
        a.produto as company,\
        JSON_ARRAY(1, 2) as labels,\
        'contacts' as folder\
      FROM analytics.AuxAssinaturas as a\
      LEFT JOIN eduzz.vendas as v ON (v.cliente_email = a.cliente_email)\
      GROUP BY id\
      LIMIT 20\
    ";
    
    return Promise.resolve(query);
  })
  .then(async q => {
    //console.log("Executando query", q);
    await connection.beginTransaction();
    var result = await connection.query(q);
    await connection.commit();
    return Promise.resolve(result);      
  })
  .then((data)=>{
    return Promise.resolve({
      statusCode:200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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



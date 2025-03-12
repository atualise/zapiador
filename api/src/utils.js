//const { v4: uuidv4 } = require('uuid');


const formatTimestampToDatetime = (input) => {
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



function error_return(error) {
    return new Promise((resolve, reject) => resolve({        
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify(error),
    }));
}


function sucess_return(data) {    
    return new Promise((resolve, reject) => resolve({        
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify(data),        
    }));
}



function nodata_return() {
    return {
        statusCode: 400,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify('{"message":"Nenhum dado foi enviado na requisição"}'),
    };
}



function constructQueryMessageSave (data, db_config) {
    var params = [];
    //console.log(data);
    
    //if (data.id) params.push(["id", data.id]);
    if (data.message_id) params.push(["message_id", data.message_id]);
    if (data.from_id) params.push(["from_id", data.from_id]);
    if (data.from_name) params.push(["from_name", data.from_name]);
    if (data.from_phone) params.push(["from_phone", data.from_phone]);
    if (data.to_id) params.push(["to_id", data.to_id]);
    if (data.to_name) params.push(["to_name", data.to_name]);
    if (data.to_phone) params.push(["to_phone", data.to_phone]);
    if (data.window_id) params.push(["window_id", data.window_id]);
    if (data.text_message) params.push(["text_message", data.text_message]);
    if (data.document_message) params.push(["document_message", data.document_message]);
    if (data.created_at) params.push(["created_at", data.created_at]);
    
    var returnQuery = "INSERT INTO "+db_config.database+".whatsapp ( "+params.map(v => v[0]).join(',')+' ) VALUES ( "'+params.map(v => v[1]).join('","')+'" );';
    //console.log(returnQuery);
    return returnQuery;
}





function getTimestamp() {
    const dt = new Date();
    return new Date().toJSON().slice(0, 19).replace('T', ' ');
}


function Returns() {
    this.error_return = error_return;
    this.sucess_return = sucess_return;
    return this;
}

function Formatters() {
    this.formatTimestampToDatetime = formatTimestampToDatetime;
    return this;
}



function Queries() {
    
    this.constructQueryMessageSave = constructQueryMessageSave;
    
    return this;
}

module.exports = {
    Returns: Returns,
    Formatters: Formatters,
    Queries: Queries,
}
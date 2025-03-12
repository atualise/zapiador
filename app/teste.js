
const moment = require('moment');



var data = "2024-11-14T16:49:50.000Z";


var mom = moment(data).format("DD/MM HH:mm");

console.log(mom, data);
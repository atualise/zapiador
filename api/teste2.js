const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');



var resposta = 'event: heartbeat\
data: null\
\
event: complete\
data: ["**Rewrite**\n\nQuando Jesus disse \"Nada fa\u00e7o por Mim mesmo\" (Jo\u00e3o 8:28), ele estava se referindo ao fato de que recebeu sua miss\u00e3o e poder de Deus. A import\u00e2ncia da vida e obra de Jesus est\u00e1 em seu princ\u00edpio de dar, como ele pr\u00f3prio disse: \"Eu n\u00e3o busco a Minha gl\u00f3ria\", mas a \"daquele que Me enviou\" (Jo\u00e3o 8:50). Ele veio para completar o circuito da benefic\u00eancia, representando o car\u00e1ter do grande Doador. Sua morte foi um ato de amor e sacrif\u00edcio, demonstrando seu princ\u00edpio fundamental de dar e servir, em vez de buscar sua pr\u00f3pria gl\u00f3ria."]\
';


var resposta1 = 'event: complete\
data: ["I will operate in **Rewrite** mode to provide an answer based on the new context.\n\nPor que Jesus morreu? \u00c9 porque ele veio para dar, como mencionado no princ\u00edpio da lei da vida. Ele recebeu tudo de Deus para dar e assim completar o circuito da benefic\u00eancia. Sua morte sacrificial foi uma demonstra\u00e7\u00e3o desse princ\u00edpio, permitindo que Deus d\u00ea a todos, incluindo os pecadores, a oportunidade de se redimir e ser salvos. A morte de Jesus \u00e9 um ato de amor e miseric\u00f3rdia de Deus para o mundo, mostrando sua disposi\u00e7\u00e3o em perdoar e salvar os humanos."]';



var evento = resposta.split("data:");
console.log(evento);
var retorno = "";
for(i in evento){
    var trecho = evento[i].trim();
    if(trecho.startsWith('[') && trecho.endsWith(']')){
        trecho = trecho.replace('["', '').replace('"]', '').replace('**Rewrite**', '');
        retorno = decoder.write(trecho);
    }
}
console.log(retorno);

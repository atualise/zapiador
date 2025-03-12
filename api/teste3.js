
unescapeUnicode = require('unescape-unicode');

function utf8Encode(unicodeString) {
    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
    const utf8String = unicodeString.replace(
        /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    ).replace(
        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
    return utf8String;
  }
  
  
  

var resposta = '\n\nA vida e obra de Ellen White s\u00e3o um testemunho poderoso da Palavra de Deus. Como profetisa digna, ela deixou marcas inesquec\u00edveis em diversas publica\u00e7\u00f5es, incluindo \"Testemunhos Seletos\", \"Mensagens Escolhidas\" e \"Livro Passaporte para a Miss\u00e3o\". Al\u00e9m disso, suas palavras inspiradoras s\u00e3o frequentemente citadas em publica\u00e7\u00f5es como The Review and Herald. Suas obras continuam a ser uma fonte de orienta\u00e7\u00e3o e conforto para muitos crentes ao redor do mundo.\n\nEssa resposta busca capturar o esp\u00edrito da vida e obra de Ellen White, destacando sua import\u00e2ncia como profetisa digna e a relev\u00e2ncia cont\u00ednua das suas publica\u00e7\u00f5es.';


var dec = utf8Encode(resposta);

var dec1 = resposta.replace(/\\u([0-9a-fA-F]{4})/g, (m,cc)=>String.fromCharCode("0x"+cc));

console.log(dec1);

//console.log(dec);
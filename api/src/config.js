"use strict";

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Exporta as configurações para serem usadas em toda a aplicação
module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  whatsapp: {
    webhookToken: process.env.WEBHOOK_VERIFY_TOKEN,
    graphToken: process.env.GRAPH_API_TOKEN
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accountId: process.env.AWS_ACCOUNT_ID
  },
  domain: {
    name: process.env.DOMAIN_NAME
  }
}; 
# Zapiador - Orquestrador de Tarefas com LLM e Integração WhatsApp

## Sobre o Projeto

O Zapiador é um sistema orquestrador de tarefas que utiliza Large Language Models (LLM) e integração com o WhatsApp. O projeto permite automatizar fluxos de comunicação e processos de negócio através de um sistema de funis, que orquestram mensagens e ações baseadas nas interações dos usuários.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Backend (API)

- **Tecnologia**: Node.js com serverless framework para implantação na AWS
- **Principais funcionalidades**:
  - Integração com a API do WhatsApp para envio e recebimento de mensagens
  - Sistema de fila (SQS) para processamento assíncrono de mensagens e tarefas
  - Orquestrador de fluxos de conversação baseado em funis
  - Conexão com banco de dados MariaDB para armazenamento de dados
  - Integração com LLM para processamento inteligente de respostas

### Frontend (App)

- **Tecnologia**: React.js com estrutura modular
- **Principais funcionalidades**:
  - Dashboard para visualização de métricas
  - Interface para gerenciamento de funis de atendimento
  - Sistema de autenticação de usuários
  - Visualização de contatos e conversas
  - Interface para configuração de fluxos de automação

## Tecnologias Utilizadas

### Backend
- Node.js
- Serverless Framework
- AWS Lambda
- AWS SQS (Simple Queue Service)
- MariaDB
- API do WhatsApp Business
- Axios para requisições HTTP

### Frontend
- React.js
- Redux para gerenciamento de estado
- React Router para navegação
- Material UI (inferido pela estrutura de pastas)
- Analytics com Google Analytics

## Funcionalidades Principais

1. **Integração com WhatsApp**: Permite enviar e receber mensagens através da API oficial do WhatsApp Business.
2. **Orquestração de Funis**: Cria fluxos de conversação automatizados com base em regras definidas pelo usuário.
3. **Automação de Tarefas**: Executa ações predefinidas com base nas interações e respostas dos usuários.
4. **Integração com LLM**: Utiliza modelos de linguagem para processamento inteligente de mensagens.
5. **Dashboard de Análise**: Visualização de métricas e desempenho dos funis de comunicação.

## Arquitetura

O sistema utiliza uma arquitetura serverless na AWS, com o seguinte fluxo:

1. Mensagens do WhatsApp são recebidas através de webhooks
2. Mensagens são processadas e encaminhadas para filas SQS
3. Funções Lambda processam as mensagens e executam as ações definidas nos funis
4. Respostas são enviadas de volta ao usuário via WhatsApp
5. Todo o fluxo e histórico é registrado no banco de dados

## Status do Projeto

Este projeto está em desenvolvimento e algumas funcionalidades ainda estão sendo implementadas. A estrutura básica do orquestrador de tarefas está funcional, mas integrações adicionais e melhorias na interface do usuário estão planejadas.

## Equipe

Desenvolvido por Atualise Serviços Digitais. 
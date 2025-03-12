


module.exports.lista_funils = [
    {
      negocio_id: "BRTTI",
      funil_id: "F123",
      funil_nome: "Funil clientes renovação",
      status: "ACTIVE",
      funil_steps: [
        {
          sequence: 0,
          type: "ROBO",
          robo: {
            robo_id: "R123"
          }
        },
        {
          sequence: 1,
          type: "TEMPLATE",
          template: {
            template_id: "T123"
          }
        },
        {
          sequence: 1,
          type: "FORM",
          form: {
            form_id: "F123"
          }
        },
        {
          sequence: 1,
          type: "SCHEDULER",
          scheduler: {
            scheduler_id: "S123"
          }
        },
        {
          sequence: 1,
          type: "TAG",
          tag: {
            tag_id: "T123"
          }
        }
      ]
    }
  ];
  
  module.exports.lista_robos = [
    {
      negocio_id: "BRTTI",
      robo_id: "R123",
      robo_nome: "Robo de mensagem recebida encaminha para ususario",
      gatilho_execucao: "MESSAGE_RECEIVED",
      produtos_contexto: ['2435161'],
      tarefa_execucao: "FORWARD_USER",
      params: { 
        user_id: "U123"
      },
      is_active: true,
      created_at: "2024-11-01 10:00:00",
      executed_at: "2024-11-28 10:00:00"
    },
    {
      negocio_id: "BRTTI",
      robo_id: "R456",
      robo_nome: "Robo de carrinho abandonado adiciona funil",
      gatilho_execucao: "ABANDONED_CART",
      produtos_contexto: ['2435161'],
      tarefa_execucao: "ADD_FUNIL",
      params: { 
        funil_id: "F123"
      },
      is_active: true,
      created_at: "2024-11-01 10:00:00",
      executed_at: "2024-11-28 10:00:00"
    }
  ];
  
  module.exports.lista_users = [
    {
      negocio_id: "BRTTI",
      user_id: "U123",
      user_nome: "Vagner Amaral"
    },
    {
      negocio_id: "BRTTI",
      user_id: "U456",
      user_nome: "Luiza Amaral"
    }
  ];
  
  module.exports.lista_gatilhos = ["MESSAGE_RECEIVED", "ABANDONED_CART", "SCHEDULED"];
  
  
  module.exports.lista_tarefas = ["FORWARD_USER", "FORWARD_GROUP", "ADD_FUNIL", "MOVE_FUNIL", "REMOVE_FUNIL"];
  
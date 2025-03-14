import moment from 'moment';

export const users = [
  {
    id: 1,
    channelId: 'chat_channel_45352521',
    name: 'Alex Dolgove',
    profile_pic: 'https://www.designi.com.br/images/preview/12161378.jpg',
    status: 'away',
    mood: 'English versions from the 1914 translation by H. Rackham',
    lastMessage: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    unreadMessage: '',
    lastMessageTime: '20 min ago',
    favourite: true,
  },
  {
    id: 2,
    channelId: 'chat_channel_45352522',
    name: 'Domnic Brown',
    profile_pic: 'https://www.designi.com.br/images/preview/12161376.jpg',
    status: 'online',
    mood: 'English versions from the 1914 translation by H. Rackham',
    lastMessage: 'It is a long established fact',
    unreadMessage: '4',
    lastMessageTime: 'Yesterday',
    favourite: true,
  },
  {
    id: 3,
    channelId: 'chat_channel_45352523',
    name: 'Domnic Harris',
    profile_pic: 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao-1024x538.jpg',
    status: 'offline',
    mood: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    lastMessage: 'There are many variations of passages of ',
    unreadMessage: '',
    lastMessageTime: '20/11/17',
    favourite: false,
  },
  {
    id: 4,
    channelId: 'chat_channel_45352524',
    name: 'Garry Sobars',
    profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROYIxfO0el9_f17_msy47K6rpofzEQfA8Dvg&s',
    status: 'away',
    mood: 'It is a long established fact',
    lastMessage: 'English versions from the 1914 translation by H. Rackham',
    unreadMessage: '3',
    lastMessageTime: 'Yesterday',
    favourite: true,
  },
  {
    id: 5,
    channelId: 'chat_channel_45352525',
    name: 'Jeson Born',
    profile_pic: 'https://www.tenda.com/blog/wp-content/uploads/2021/09/Pessoa-fisica-mobile.jpg',
    status: 'away',
    mood: 'I must explain to you how all this mistaken idea of denouncing ',
    lastMessage: 'It is a long established fact',
    unreadMessage: '',
    lastMessageTime: 'Monday',
    favourite: true,
  },
  {
    id: 6,
    channelId: 'chat_channel_45352526',
    name: 'Jimmy Jo',
    profile_pic: 'https://static.significados.com.br/foto/pessoa-og.jpg?class=ogImageRectangle',
    status: 'online',
    mood: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
    lastMessage: 'All the Lorem Ipsum generators on the',
    unreadMessage: '',
    lastMessageTime: 'Friday',
    favourite: false,
  },
  {
    id: 7,
    channelId: 'chat_channel_45352527',
    name: 'John Smith',
    profile_pic: 'https://wendellcarvalho.com.br/wp-content/uploads/2023/07/Saiba-o-que-e-uma-pessoa-temperamental-e-como-esse-comportamento-pode-afetar-diferentes-areas-da-vida.jpg',
    status: 'away',
    mood: 'There are many variations of passages of ',
    lastMessage: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
    unreadMessage: '',
    lastMessageTime: 'Tuesday',
    favourite: true,
  },
  {
    id: 8,
    channelId: 'chat_channel_45352528',
    name: 'Kadir M',
    profile_pic: 'https://mundoemrevista.com.br/wp-content/uploads/2024/05/pessoa-de-classe-elegante.webp',
    status: 'online',
    mood: 'All the Lorem Ipsum generators on the',
    lastMessage: 'I must explain to you how all this mistaken idea of denouncing ',
    unreadMessage: '5',
    lastMessageTime: 'Monday',
    favourite: false,
  },
  {
    id: 9,
    channelId: 'chat_channel_45352529',
    name: 'Jimmy Jon',
    profile_pic: 'https://via.placeholder.com/150x150',
    status: 'offline',
    mood: 'There are many variations of passages of ',
    lastMessage: 'There are many variations of passages of ',
    unreadMessage: '',
    lastMessageTime: '30 Min ago',
    favourite: false,
  },
  {
    id: 10,
    channelId: 'chat_channel_45352530',
    name: 'Stella Johnson',
    profile_pic: 'https://via.placeholder.com/150x150',
    status: 'offline',
    mood: 'It is a long established fact',
    lastMessage: 'English versions from the 1914 translation by H. Rackham',
    unreadMessage: '',
    lastMessageTime: 'Yesterday',
    favourite: false,
  },
  {
    id: 11,
    channelId: 'chat_channel_45352531',
    name: 'Steve Smith',
    profile_pic: 'https://via.placeholder.com/150x150',
    status: 'online',
    mood: 'The standard chunk of Lorem Ipsum used since the 1500s',
    lastMessage: 'The standard chunk of Lorem Ipsum used since the 1500s',
    unreadMessage: '2',
    lastMessageTime: 'Monday',
    favourite: false,
  },
];
export const conversation = [
  {
    id: 'chat_channel_45352521',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'It is a long established fact',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'I must explain to you how all this mistaken idea of denouncing ',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'It is a long established fact',
        sentAt: moment().subtract(1, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'The standard chunk of Lorem Ipsum used since the 1500s',
        sentAt: moment(),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://wendellcarvalho.com.br/wp-content/uploads/2023/07/pessoa-intensa.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://wendellcarvalho.com.br/wp-content/uploads/2023/07/pessoa-intensa.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'received.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
      {
        messageType: 'media',
        type: 'received',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
      {
        messageType: 'media',
        type: 'received',
        media: [
          {
            preview: '/images/dashboard/intranet-latest-notifications-mi.mov',
            name: 'intranet-latest-notifications-mi.mov',
            path: '/images/dashboard/intranet-latest-notifications-mi.mov',
            metaData: { type: 'video/mov', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: '/images/dashboard/intranet-latest-notifications-mi.mov',
            name: 'intranet-latest-notifications-mi.mov',
            path: '../../assets/images/dashboard/intranet-latest-notifications-mi.mov',
            metaData: { type: 'video/mov', size: 4056 },
          },
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'received.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
    ],
  },
  {
    id: 'chat_channel_45352522',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment().subtract(2, 'days'),
      },
    ],
  },
  {
    id: 'chat_channel_45352523',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'It is a long established fact',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'I must explain to you how all this mistaken idea of denouncing ',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'media',
        type: 'received',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment().subtract(1, 'days'),
      },
    ],
  },
  {
    id: 'chat_channel_45352524',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'It is a long established fact',
        sentAt: moment().subtract(1, 'days'),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
    ],
  },
  {
    id: 'chat_channel_45352525',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'It is a long established fact',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'I must explain to you how all this mistaken idea of denouncing ',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'It is a long established fact',
        sentAt: moment().subtract(1, 'days'),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
    ],
  },
  {
    id: 'chat_channel_45352526',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'It is a long established fact',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'I must explain to you how all this mistaken idea of denouncing ',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'It is a long established fact',
        sentAt: moment().subtract(1, 'days'),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
    ],
  },
  {
    id: 'chat_channel_45352527',
    conversationData: [
      {
        messageType: 'text',
        type: 'received',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'It is a long established fact',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'media',
        type: 'received',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment().subtract(1, 'days'),
      },
    ],
  },
  {
    id: 'chat_channel_45352528',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'It is a long established fact',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'I must explain to you how all this mistaken idea of denouncing ',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'It is a long established fact',
        sentAt: moment().subtract(1, 'days'),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
    ],
  },
  {
    id: 'chat_channel_45352529',
    conversationData: [
      {
        messageType: 'text',
        type: 'received',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'I must explain to you how all this mistaken idea of denouncing ',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'It is a long established fact',
        sentAt: moment().subtract(1, 'days'),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
    ],
  },
  {
    id: 'chat_channel_45352530',
    conversationData: [
      {
        messageType: 'text',
        type: 'sent',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'English versions from the 1914 translation by H. Rackham',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'It is a long established fact',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'I must explain to you how all this mistaken idea of denouncing ',
        sentAt: moment().subtract(10, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'It is a long established fact',
        sentAt: moment().subtract(1, 'days'),
      },
      {
        messageType: 'media',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment(),
      },
    ],
  },
  {
    id: 'chat_channel_45352531',
    conversationData: [
      {
        messageType: 'text',
        type: 'received',
        message: 'There are many variations of passages of ',
        sentAt: moment().subtract(9, 'days'),
      },
      {
        messageType: 'text',
        type: 'received',
        message: 'All the Lorem Ipsum generators on the',
        sentAt: moment().subtract(2, 'days'),
      },
      {
        messageType: 'text',
        type: 'sent',
        media: [
          {
            preview: 'https://www.designi.com.br/images/preview/12161378.jpg',
            name: 'bitcoin-mousetrap.jpg',
            path: 'https://www.designi.com.br/images/preview/12161378.jpg',
            metaData: { type: 'images/jpg', size: 4056 },
          },
        ],
        sentAt: moment().subtract(2, 'days'),
      },
    ],
  },
];

import IntlMessages from '../../../utils/IntlMessages';
import {
  Chat,
  AccountCircle,
  Contacts,
  ShowChart,
  CheckCircle
} from '@material-ui/icons';
import React from 'react';


const appsMenus = [
  {
    name: <IntlMessages id={'sidebar.dashboard'} />,
    icon: <ShowChart />,
    type: 'item',
    link: '/dashboard',
  },
  {
    name: <IntlMessages id={'sidebar.robos'} />,
    type: 'item',
    icon: <CheckCircle />,
    link: '/funils',
  },
  {
    name: <IntlMessages id={'sidebar.appModule.chat'} />,
    type: 'item',
    icon: <Chat />,
    link: '/apps/chat',
  },
  {
    name: <IntlMessages id={'sidebar.profile'} />,
    type: 'item',
    icon: <AccountCircle />,
    link: '/apps/profile',
  },
  {
    name: <IntlMessages id={'sidebar.wall'} />,
    type: 'item',
    icon: <Contacts />,
    link: '/apps/contacts',
  },
  {
    name: <IntlMessages id={'sidebar.appModule.kanbanBoard'} />,
    type: 'item',
    icon: <Chat />,
    link: '/apps/kanban',
  },
  {
    name: <IntlMessages id={'sidebar.appModule.toDo'} />,
    type: 'item',
    icon: <CheckCircle />,
    link: '/apps/to-do',
  },
];


export const sidebarNavs = [
  
  {
    name: <IntlMessages id={'sidebar.Apps'} />,
    type: 'section',
    children: appsMenus,
  },
  
];

export const horizontalDefaultNavs = [
  
  {
    name: <IntlMessages id={'sidebar.Apps'} />,
    type: 'collapse',
    children: appsMenus,
  },
];

export const minimalHorizontalMenus = [
  
  {
    name: <IntlMessages id={'sidebar.Apps'} />,
    type: 'collapse',
    children: [...appsMenus],
  },
];

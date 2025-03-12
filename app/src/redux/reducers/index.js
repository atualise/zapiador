import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Users from './Users';
import Chat from './Chat';
import ProfileApp from './ProfileApp';
import ContactApp from './ContactApp';
import TaskList from './TaskList';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    users: Users,
    chat: Chat,
    usersReducer: Users,
    profileApp: ProfileApp,
    contactApp: ContactApp,
    taskList: TaskList,
  });

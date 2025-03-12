import axios from 'axios';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import {
  SEND_NEW_CHAT_MESSAGE,
  SEND_NEW_MEDIA_MESSAGE,
  SET_CHAT_USERS,
  SET_CONTACT_USERS,
  SET_CONVERSATION_DATA,
  SET_CURRENT_USER,
} from '../../@jumbo/constants/ActionTypes';

const BASE_PATH = "https://api.zapiador.com/whatsapp";
//const BASE_PATH_LOCAL = "http://localhost:4000";

const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
};

export const getChatUsers = (filterData = { search: '' }) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.get(BASE_PATH+'/v1/contacts', { params: { filterData: filterData } }, {header}).then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        dispatch({
          type: SET_CHAT_USERS,
          payload: data.data,
        });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    });
  };
};

export const getContactUsers = (filterData = { search: '' }) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.get(BASE_PATH+'/v1/contacts', { params: { filterData: filterData } }).then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        dispatch({
          type: SET_CONTACT_USERS,
          payload: data.data,
        });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    });
  };
};

export const getConversation = channelId => {
  return dispatch => {
    dispatch(fetchStart());
    axios.get(BASE_PATH+'/v1/contact/conversation', { params: { channelId } }).then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        dispatch({
          type: SET_CONVERSATION_DATA,
          payload: data.data,
        });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    });
  };
};

export const onUserSelect = user => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };
};

export const sendTextMessage = (message, user) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.post(BASE_PATH+'/v1/send', { text_message:message, to_phone:user.channelId }, {header}).then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        dispatch({
          type: SEND_NEW_CHAT_MESSAGE,
          payload: message,
        });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    });
  };
};

export const sendMediaMessage = file => {
  return dispatch => {
    dispatch({
      type: SEND_NEW_MEDIA_MESSAGE,
      payload: file,
    });
  };
};

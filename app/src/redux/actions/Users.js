import { fetchError, fetchStart, fetchSuccess, chamadaPadrao, comunicateSuccess } from './Common';
import { ADD_USER, EDIT_USER, GET_USERS, SET_USER_DETAILS } from '../../@jumbo/constants/ActionTypes';
import { AuhMethods } from '../../services/auth';
import { CurrentAuthMethod } from '../../@jumbo/constants/AppConstants';

const API_URL = 'https://api.sindicato.cloud/usuarios';
// const API_URL_LOCAL = 'http://localhost:4000';

export const setCurrentUser = user => {
  return dispatch => {
    dispatch({ type: SET_USER_DETAILS, payload: user });
  };
};

const formatUserFromServer = data => {
  const newData = { ...data, name: data.displayName };
  return newData;
};

export const sentMailToUser = params => {
  return dispatch => {
    dispatch(fetchStart());
    dispatch(AuhMethods[CurrentAuthMethod].onForgotPassword(params.email));
    dispatch(comunicateSuccess('Foi enviado um email para o usuário redefinir a senha.'));
  };
};

// retorna a lista de usuarios
export const getUsers = (paramsObj, callbackfn) => {
  return (dispatch, getState) => {
    dispatch(
      chamadaPadrao('get', `${API_URL}/v1/users`, paramsObj, null, data => {
        if (data.status === 200) {
          dispatch({ type: GET_USERS, payload: data.data });
          if (callbackfn) callbackfn(data.data);
          dispatch(fetchSuccess());
        } else {
          dispatch(fetchError('Aconteceu algum erro do lado do servidor.'));
        }
      }),
    );
  };
};

// cria um novo usuario
export const addNewUser = (paramsObj, callbackfn) => {
  return (dispatch, getState) => {
    dispatch(
      chamadaPadrao('post', `${API_URL}/v1/user`, null, paramsObj, data => {
        if (data.status === 200 || data.status === 204) {
          const dataFormated = formatUserFromServer(data.data);
          dispatch({ type: ADD_USER, payload: dataFormated });
          if (callbackfn) callbackfn(dataFormated);
          dispatch(comunicateSuccess('O novo usuário foi salvo com sucesso.'));
        } else {
          dispatch(fetchError('Aconteceu algum erro do lado do servidor.'));
        }
      }),
    );
  };
};

// edita um usuario
export const updateUser = (paramsObj, callbackfn) => {
  return (dispatch, getState) => {
    dispatch(
      chamadaPadrao('put', `${API_URL}/v1/user`, null, paramsObj, data => {
        if (data.status === 200 || data.status === 204) {
          dispatch({ type: EDIT_USER, payload: data.data });
          if (callbackfn) callbackfn(data.data);
          dispatch(comunicateSuccess('Os dados do usuário foram atualizados com sucesso.'));
        } else {
          dispatch(fetchError('Aconteceu algum erro do lado do servidor.'));
        }
      }),
    );
  };
};

// edita o status do usuario
export const updateUserStatus = (paramsObj, callbackfn) => {
  return (dispatch, getState) => {
    dispatch(
      chamadaPadrao('put', `${API_URL}/v1/users/update-status`, null, paramsObj, data => {
        if (data.status === 200 || data.status === 204) {
          dispatch({ type: EDIT_USER, payload: data.data });
          if (callbackfn) callbackfn(data.data);
          dispatch(comunicateSuccess('O status do usuário foi atualizado com sucesso.'));
        } else {
          dispatch(fetchError('Aconteceu algum erro do lado do servidor.'));
        }
      }),
    );
  };
};

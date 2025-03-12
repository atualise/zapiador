import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, COMUNICATE_SUCCESS } from '../../@jumbo/constants/ActionTypes';
import { refreshToken } from './Auth';
import axios from 'axios';

var replyCount = 0;

export const fetchSuccess = msg => {
  return dispatch => {
    dispatch({
      type: FETCH_SUCCESS,
    });
  };
};
export const fetchError = error => {
  return dispatch => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  };
};

export const fetchStart = () => {
  return dispatch => {
    dispatch({
      type: FETCH_START,
    });
  };
};

export const comunicateSuccess = message => {
  return dispatch => {
    dispatch({
      type: COMUNICATE_SUCCESS,
      payload: message,
    });
  };
};

export const chamadaPadrao = (requestType, apiUrl, paramsObj, dataObj, successCallbackFn) => {
  return (dispatch, getState) => {
    function chamada() {
      var headerObj;
      var reqObj;

      if (paramsObj && paramsObj.headers) {
        var paramHeader = paramsObj.headers;
        delete paramsObj.headers;
        headerObj = {
          params: paramsObj,
          headers: authHeader(getState, paramHeader),
        };
      } else {
        headerObj = {
          params: paramsObj,
          headers: authHeader(getState),
        };
      }
      switch (requestType) {
        case 'get':
          reqObj = axios.get(apiUrl, headerObj);
          break;
        case 'post':
          reqObj = axios.post(apiUrl, dataObj, headerObj);
          break;
        case 'put':
          reqObj = axios.put(apiUrl, dataObj, headerObj);
          break;
        case 'delete':
          reqObj = axios.delete(apiUrl, headerObj);
          break;
        default:
          console.log('default');
          break;
      }
      if (reqObj) reqObj.then(successCallbackFn).catch(errorCallbackFn);
      else dispatch(fetchError('Nao foi possivel fazer a chamada para o servidor.'));
    }

    function errorCallbackFn(error) {
      if (error.response && (error.response.status === 503 || error.response.status === 500)) {
        var temptimeout = setTimeout(() => {
          replyCount = replyCount + 1;
          if (replyCount < 10) {
            chamada();
          } else {
            clearTimeout(temptimeout);
          }
        }, 5);
      } else if (error.response && error.response.status === 401) {
        dispatch(refreshToken());
        setTimeout(() => {
          chamada();
        }, 5);
      } else {
        dispatch(fetchError(error.message));
      }
    }

    function authHeader(getState, headerParams) {
      const user = getState().auth.authUser;
      var retorno = {};
      if (user && user.idToken) {
        retorno = {
          Authorization: 'Bearer ' + user.idToken,
        };
        if (headerParams) {
          retorno = { ...headerParams };
        }
      }
      return retorno;
    }

    dispatch(fetchStart());
    chamada();
  };
};

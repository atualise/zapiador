import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, COMUNICATE_SUCCESS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  initialURL: '/',
  error: '',
  loading: false,
  success: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: '', loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: '', loading: false };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case COMUNICATE_SUCCESS: {
      return { ...state, loading: false, success: action.payload };
    }
    default:
      return state;
  }
};

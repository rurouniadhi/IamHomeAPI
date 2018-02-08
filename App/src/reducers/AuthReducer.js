import {
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, ...INITIAL_STATE, error: 'error mang !', loading: false };
    case LOGOUT_USER:
      return { ...state, error: '', loading: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

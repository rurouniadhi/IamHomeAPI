import _ from 'lodash';
import { GoogleSignin } from 'react-native-google-signin';
import {
  USER_DB,
  USER_DB_SUCCESS
} from './types';

export const getCurrentUserdb = ({ items }) => {
  return (dispatch) => {
    dispatch({ type: USER_DB });
    const currentUser = GoogleSignin.currentUser().email;
    const userdb = _.find(items, { Email: currentUser });
      if (userdb != null) {
        getCurrentUserSuccess(dispatch, userdb);
      }
  };
};

const getCurrentUserSuccess = (dispatch, userdb) => {
  dispatch({
    type: USER_DB_SUCCESS,
    payload: userdb
  });
};

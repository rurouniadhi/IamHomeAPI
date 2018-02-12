import _ from 'lodash';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
} from './types';

export const loginUser = ({ items }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    GoogleSignin.signIn()
    .then((user) => {
      const currentUser = GoogleSignin.currentUser().email;
      const userdb = _.find(items, { Email: currentUser });
        if (userdb != null) {
          loginUserSuccess(dispatch, user);
          Actions.home({ Status: userdb.Status });
        } else {
          Alert.alert(
            'Please register your email first.',
            '',
            [
              { text: 'OK' },
            ],
            { cancelable: false }
          );
          console.log('you are not allow');
          GoogleSignin.signOut();
          loginUserFail(dispatch);
        }
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
      loginUserFail(dispatch);
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    GoogleSignin.signOut()
    .then(() => {
      logoutUserSuccess(dispatch);
    })
    .catch((err) => {
      console.log(err);
    });
  };
};

const logoutUserSuccess = (dispatch) => {
  dispatch({
    type: LOGOUT_USER_SUCCESS
  });
  Actions.login();
  console.log('out');
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { GoogleSignin } from 'react-native-google-signin';
import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';
import reducers from './reducers';
import Router from './Router';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {
  componentWillMount() {
    GoogleSignin.configure({
      webClientId:
        '1070010664755-mq4tqa1ttemavkh3fa7697hqc9p11kra.apps.googleusercontent.com'
    });
    GoogleSignin.hasPlayServices({ autoResolve: true });
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
        // process the notification
      },
    });
    OneSignal.configure({});
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { GoogleSignin } from 'react-native-google-signin';
import reducers from './reducers';
import Router from './Router';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  componentWillMount() {
    GoogleSignin.configure({
      webClientId:
        '1070010664755-74hurvecb3g5jqtn0g7q3erpptsk6i70.apps.googleusercontent.com'
    });
    GoogleSignin.hasPlayServices({ autoResolve: true });
    // GoogleSignin.currentUserAsync().then((user) => {
    //   this.setState({ user });
    // }).done();
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

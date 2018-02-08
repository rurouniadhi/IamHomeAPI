import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import CheckinPage from './components/CheckinPage';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" hideNavBar>
          <Scene
            key="login"
            component={LoginForm}
            initial
          />
        </Scene>
        <Scene key="main">
          <Scene
            key="home"
            component={Home}
            renderBackButton={() => (null)}
            hideNavBar
          />
          <Scene
            key="checkinpage"
            component={CheckinPage}
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;

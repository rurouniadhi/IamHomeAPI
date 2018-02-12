import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleSignin } from 'react-native-google-signin';
import PushNotification from 'react-native-push-notification';
import { Actions } from 'react-native-router-flux';
import UserList from './UserList';
import { ButtonCircle } from './common';
import { logoutUser, loginUser, itemsFetchData } from '../actions';

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleAppStateChange = this.handleAppStateChange.bind(this);
  // }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
     return true;
    });
    // AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }
  componentDidMount() {
    this.props.itemsFetchData();
    this.notif();
  }
  componentWillUnmount() {
    // AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }
  onRefresh() {
    this.props.itemsFetchData();
  }
  onLogoutPress() {
    Alert.alert(
      '',
      'Are you sure you want to logout ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK',
          onPress: () => {
            this.props.logoutUser();
          }
        },
      ],
    );
  }
  onCheckInPress() {
    const currentUser = GoogleSignin.currentUser().email;
    const userdb = _.find(this.props.items, { Email: currentUser });
    Actions.checkinpage({ user: userdb });
  }
  note() {
    if (this.props.Status === false) {
      return <Text style={styles.noteRed}>You have not checked in today</Text>;
    }
    return <Text style={styles.note}>Welcome home</Text>;
  }
  notif() {
    const user = GoogleSignin.currentUser();
    console.log('dari notif', this.props.Status);
    if (this.props.Status === false) {
      PushNotification.localNotificationSchedule({
        message:
          `Hi, ${user.givenName}. Don't forget to checkin if you already home..`, // (required)
        date: new Date(Date.now() + (24 * 60 * 60 * 1000)) // in 60 secs
      });
    }
  }
  renderButton() {
    const { buttonFalse, buttonTrue } = styles;

    if (this.props.Status === true) {
      return (
        <ButtonCircle
          style={buttonFalse}
          onPress={this.onCheckInPress.bind(this)}
        >out</ButtonCircle>
      );
    }
    return (
      <ButtonCircle
        style={buttonTrue}
        onPress={this.onCheckInPress.bind(this)}
      >in</ButtonCircle>
    );
  }
  render() {
    const { container, welcomeText, logoutStyle, headerStyle } = styles;
    const user = GoogleSignin.currentUser();
    return (
      <View style={container}>
        <View style={headerStyle}>
          <View>
            <Text style={logoutStyle}>
              <Icon
                name='dots-three-vertical'
                onPress={this.onLogoutPress.bind(this)}
                size={20}
              />
              <Text style={welcomeText} >
                Hi, {user.givenName}
              </Text>
            </Text>
            {this.note()}
          </View>
          <Text style={logoutStyle} >
            <Icon
              name='ccw' onPress={this.onRefresh.bind(this)}
              size={30}
            />
          </Text>
        </View>
        <UserList />
        {this.renderButton()}
      </View>
    );
  }
}
const styles = {
  container: {
    backgroundColor: '#FBFFB9',
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    height: 100,
    flex: 1
  },
  welcomeText: {
    fontSize: 35,
    color: '#754F44',
    fontFamily: 'Kievit'
  },
  logoutStyle: {
    color: '#754F44',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  noteRed: {
    fontSize: 15,
    color: '#c21010',
    alignSelf: 'flex-end',
    paddingLeft: 20
  },
  note: {
    fontSize: 15,
    color: '#754F44',
    alignSelf: 'flex-start',
    paddingLeft: 20
  },
  buttonFalse: {
    backgroundColor: '#EC7357'
  },
  buttonTrue: {
    backgroundColor: '#64c46e',
  }
};

const mapStateToProps = ({ auth, users }) => {
  const { user, error, loading } = auth;
  const { items } = users;
  // const { currentUserdb } = userdb;
  return {
    // currentUserdb,
    user,
    error,
    loading,
    items
  };
};

export default connect(mapStateToProps, {
  logoutUser, loginUser, itemsFetchData
})(Home);

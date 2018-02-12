import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Alert, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import UserList from './UserList';
import { ButtonCircle } from './common';
import { logoutUser, loginUser, itemsFetchData } from '../actions';

class Home extends Component {
  componentWillMount() {
   BackHandler.addEventListener('hardwareBackPress', () => {
     return true;
   });
  }
  componentDidMount() {
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
            <Text style={welcomeText} >
              Hi, {user.givenName}
            </Text>
            {this.note()}
          </View>
          <Text style={logoutStyle} >
            <Icon
              name='log-out' onPress={this.onLogoutPress.bind(this)}
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
    height: 100
  },
  welcomeText: {
    fontSize: 35,
    color: '#754F44',
    fontFamily: 'Kievit'
  },
  logoutStyle: {
    color: '#754F44'
  },
  noteRed: {
    fontSize: 15,
    color: '#c21010',
    alignSelf: 'flex-end'
  },
  note: {
    fontSize: 15,
    color: '#754F44',
    alignSelf: 'flex-start'
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

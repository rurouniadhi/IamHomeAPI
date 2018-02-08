import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Alert, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import UserList from './UserList';
import { logoutUser, loginUser, itemsFetchData } from '../actions';
import { ButtonCircle } from './common';


class Home extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }
  onLogoutPress() {
    Alert.alert(
      '',
      'Are you sure you want to logout ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.props.logoutUser() },
      ],
    );
  }
  onCheckInPress() {
    const currentUser = GoogleSignin.currentUser().email;
    const userdb = _.find(this.props.items, { Email: currentUser });
    Actions.checkinpage({ user: userdb });
  }
  note() {
    const currentUser = GoogleSignin.currentUser().email;
    const userdb = _.find(this.props.items, { Email: currentUser });
    if (userdb.Status !== undefined && userdb.Status === false) {
      return <Text style={styles.note}>You have not checked in today</Text>;
    }
  }

  renderButton() {
    const currentUser = GoogleSignin.currentUser().email;
    const userdb = _.find(this.props.items, { Email: currentUser });
    if (userdb.Status === true) {
      return (
        <ButtonCircle
          style={styles.buttonFalse}
          onPress={this.onCheckInPress.bind(this)}
        >out</ButtonCircle>
      );
    }
    return (
      <ButtonCircle
        onPress={this.onCheckInPress.bind(this)}
      >in</ButtonCircle>
    );
  }
  render() {
    console.log('dari home', this.props.items);
    const user = GoogleSignin.currentUser();
    const { welcomeText, logoutStyle, headerStyle } = styles;

    return (
      <View style={{ backgroundColor: '#FBFFB9', flex: 1 }}>
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
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    height: 100
  },
  welcomeText: {
    fontSize: 35,
    color: '#754F44',
  },
  logoutStyle: {
    color: '#754F44'
  },
  note: {
    fontSize: 15,
    color: '#c21010',
    alignSelf: 'flex-end'
  },
  buttonFalse: {
    backgroundColor: '#EC7357'
  },
};

const mapStateToProps = ({ auth, users }) => {
  const { error, loading } = auth;
  const { items } = users;
  return {
    error,
    loading,
    items
  };
};

export default connect(mapStateToProps, {
  logoutUser, loginUser, itemsFetchData
})(Home);

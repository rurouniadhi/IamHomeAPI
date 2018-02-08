import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleSignin } from 'react-native-google-signin';
// import { Header } from './common';
import UserList from './UserList';
import { logoutUser, loginUser } from '../actions';

class Home extends Component {
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

  render() {
    const user = GoogleSignin.currentUser();
    return (
      <View style={{ backgroundColor: '#FBFFB9', flex: 1 }}>
        <View style={styles.headerStyle}>
          <Text style={styles.welcomeText} >
            Hi, {user.givenName}
          </Text>
          <Text style={styles.logoutStyle} >
            <Icon
              name='log-out' onPress={this.onLogoutPress.bind(this)}
              size={30}
            />
          </Text>
        </View>
        <UserList />
      </View>
    );
  }
}
const styles = {
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  welcomeText: {
    fontSize: 25,
    color: '#754F44',
  },
  logoutStyle: {
    color: '#754F44'
  }
};

const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;
  return {
    error,
    loading,
  };
};

export default connect(mapStateToProps, {
  logoutUser, loginUser
})(Home);

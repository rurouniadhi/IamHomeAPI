import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spinner } from './common';
import { loginUser, itemsFetchData } from '../actions';

class LoginForm extends Component {
  componentDidMount() {
    this.props.itemsFetchData();
  }

  onButtonPress() {
    const { items } = this.props;
    this.props.loginUser({ items });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" style={{ marginTop: 400, alignSelf: 'center' }} />;
    }
    return (
      <GoogleSigninButton
        style={styles.buttonGoogle}
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={{ flex: 4, backgroundColor: '#E1CE7A', opacity: 0.8 }} />
        <View style={{ flex: 3, backgroundColor: '#FBFFB9', opacity: 0.8 }} />
        <View style={{ flex: 2, backgroundColor: '#FDD692', opacity: 0.8 }} />
        <View style={{ flex: 1, backgroundColor: '#ffe6bb', opacity: 0.8 }} />
        <Icon style={styles.logoStyle} name='home-map-marker' size={150} />
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1
  },
  logoStyle: {
    position: 'absolute',
    top: 40,
    left: 50,
    fontSize: 250,
    color: '#754F44',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 5
  },
  buttonGoogle: {
    position: 'absolute',
    height: 50,
    width: 150,
    bottom: 50,
    left: 120,
    padding: 10,
    elevation: 5,
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ auth, users }) => {
  const { error, loading } = auth;
  const { items, itemsHasErrored, itemsIsLoading } = users;
  return { error, loading, items, itemsHasErrored, itemsIsLoading };
};

export default connect(mapStateToProps, {
  loginUser, itemsFetchData
})(LoginForm);

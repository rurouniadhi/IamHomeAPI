import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
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
        color={GoogleSigninButton.Color.Light}
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.logoStyle}>Φ</Text>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(176, 209, 236, 1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoStyle: {
    position: 'absolute',
    top: 40,
    fontSize: 250,
    color: '#rgb(41, 139, 194)',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  buttonGoogle: {
    height: 50,
    width: 150,
    marginTop: 400,
    padding: 10,
    alignSelf: 'center',
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

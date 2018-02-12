import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spinner } from './common';
import { loginUser, itemsFetchData, logoutUser } from '../actions';

class LoginForm extends Component {
  componentDidMount() {
    this.props.itemsFetchData();
  }
  onButtonPress() {
    const { items } = this.props;
    this.props.loginUser({ items });
  }

  renderButton() {
    const buttonGoogle = (
      <Icon.Button
        name="google"
        backgroundColor="#000"
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: '#fff' }}>Login with Google</Text>
      </Icon.Button>
    );
    if (this.props.loading) {
      return <Spinner size="large" style={styles.buttonGoogle} />;
    }
    return (
      <View style={styles.buttonGoogle}>
        {buttonGoogle}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#dfdfdf'
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
    flex: 1,
    width: 175,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    bottom: 100
  }
};

const mapStateToProps = ({ auth, users }) => {
  const { error, loading } = auth;
  const { items, itemsHasErrored, itemsIsLoading } = users;
  // const { currentUserdb } = userdb;
  return { error, loading, items, itemsHasErrored, itemsIsLoading };
};

export default connect(mapStateToProps, {
  loginUser, itemsFetchData, logoutUser
})(LoginForm);

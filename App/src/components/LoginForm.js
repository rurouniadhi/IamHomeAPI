import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
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
        onPress={this.onButtonPress.bind(this)}
        style={{ borderWidth: 3, backgroundColor: '#dbdbdb' }}
        color='#000'
      >
        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: '#000' }}>Login with Google</Text>
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
    const { containerStyle, logoContainer, logoStyle } = styles;
    return (
      <View style={containerStyle}>
        <View
          style={logoContainer}
        >
          <Image
            style={logoStyle}
            source={require('../assets/homelogo_black.png')}
          />
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#dbdbdb'
  },
  logoContainer: {
    position: 'absolute',
    top: 200,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  logoStyle: {
    width: 150,
    resizeMode: 'contain',
    height: 150
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

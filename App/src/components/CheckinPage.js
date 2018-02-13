import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import { itemUpdate, itemSave } from '../actions';
import { note, renderButton } from './Home';
import { ButtonCircle } from './common';

class CheckinPage extends Component {
  componentWillMount() {
    _.each(this.props.user, (value, prop) => {
      this.props.itemUpdate({ prop, value });
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      return false;
    });
  }
  onCheckin() {
    const Status = !this.props.user.Status; //this toggle true/false status
    console.log('status', Status);
    const { Name, Email, PhoneNumber } = this.props;
    this.props.itemSave({ Name, Email, PhoneNumber, Status, Id: this.props.user.Id });
  }
  renderCheckinConfirm() {
    const { container, confirmText, buttonFalse } = styles;
    if (this.props.user.Status === false) {
      return (
        <View style={container}>
          <Icon name='location' size={200} />
          <Text style={confirmText}>Check in now?</Text>
          <ButtonCircle onPress={this.onCheckin.bind(this)}>
            Yes
          </ButtonCircle>
        </View>
      );
    }
    return (
      <View style={container}>
        <Icon name='aircraft-take-off' size={200} />
        <Text style={confirmText}>check out now?</Text>
        <ButtonCircle style={buttonFalse} onPress={this.onCheckin.bind(this)}>
          Yes
        </ButtonCircle>
      </View>
    );
  }
  render() {
    const { closeButton } = styles;
    return (
      <View style={{ backgroundColor: '#dbdbdb', flex: 1 }}>
        <Icon style={closeButton} name='cross' onPress={Actions.pop} size={40} />
        {this.renderCheckinConfirm()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    marginTop: 70
  },
  confirmText: {
     fontSize: 25,
     marginTop: 20,
     marginBottom: 20
  },
  confirmIconIn: {
    marginBottom: 30,
    color: '#64c46e'
  },
  confirmIconOut: {
    marginBottom: 30,
    color: '#EC7357'
  },
  closeButton: {
    margin: 30
  },
  buttonFalse: {
    backgroundColor: '#EC7357'
  },
};

const mapStateToProps = (state) => {
  const { Name, Email, PhoneNumber, Status } = state.usercheckin;
  return { Name, Email, PhoneNumber, Status };
};

export default connect(mapStateToProps, {
  itemUpdate, itemSave, note, renderButton
})(CheckinPage);

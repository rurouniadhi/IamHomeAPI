import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { itemUpdate, itemSave } from '../actions';
import { Button } from './common';

class CheckinPage extends Component {
  componentWillMount() {
    _.each(this.props.user, (value, prop) => {
      this.props.itemUpdate({ prop, value });
    });
  }

  onCheckin() {
    const Status = !this.props.Status; //this toggle true/false status
    const { Name, Email, PhoneNumber } = this.props;
    this.props.itemSave({ Name, Email, PhoneNumber, Status, Id: this.props.user.Id });
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Check in ?</Text>
        <Button onPress={this.onCheckin.bind(this)}>Checkin</Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { Name, Email, PhoneNumber, Status } = state.usercheckin;
  return { Name, Email, PhoneNumber, Status };
};

export default connect(mapStateToProps, {
  itemUpdate, itemSave
})(CheckinPage);

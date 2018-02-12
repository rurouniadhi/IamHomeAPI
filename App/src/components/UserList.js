import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { itemsFetchData, loginUser, itemSave } from '../actions';
import { CardSection } from './common';

class UserList extends Component {
    componentWillMount() {
      this.props.itemsFetchData();
    }

    render() {
        const { statusFalse, statusTrue, userStyle, cardTrue, cardFalse } = styles;

        return (
          <View>
            <FlatList
              style={{ marginBottom: 5, flex: 0 }}
              data={this.props.items}
              keyExtractor={items => items.Id}
              renderItem={({ item }) =>
                <CardSection style={[cardFalse, item.Status && cardTrue]}>
                  <Text style={userStyle}>{item.Name}</Text>
                  {item.Status && <Icon style={statusTrue} name='check' size={30} />}
                  {!item.Status && <Icon style={statusFalse} name='cross' size={30} />}
                </CardSection>
              }
            />
        </View>
        );
    }
}

const styles = {
  userStyle: {
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: 20,
    color: '#754F44'
  },
  cardTrue: {
    backgroundColor: '#c6ffda'
  },
  cardFalse: {
    backgroundColor: '#ffe3e3'
  },
  statusTrue: {
    textAlign: 'right',
    flex: 1,
    color: '#00cd46',
    alignSelf: 'center'
  },
  statusFalse: {
    color: '#c21010',
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center'
  }
};

const mapStateToProps = state => {
  const { items } = state.users;
  return { items };
};

export default connect(mapStateToProps, {
  itemsFetchData, loginUser, itemSave
})(UserList);

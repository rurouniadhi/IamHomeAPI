import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle, innerContainerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={innerContainerStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>
              {children}
            </Text>
          </CardSection>
          <CardSection style={cardSectionStyle}>
            <Button onPress={onAccept}>Yes</Button>
            <Button onPress={onDecline}>No</Button>
          </CardSection>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
    color: '#000'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  innerContainerStyle: {
    backgroundColor: 'rgb(255, 255, 255, 1)',
    justifyContent: 'center',
    flex: 1,
    height: 200
  }
};

export { Confirm };

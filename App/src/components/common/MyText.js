import React from 'react';
import { Text } from 'react-native';

const MyText = (props) => {
  const { textStyle } = styles;
  return (
      <Text style={textStyle}>{props.children}</Text>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'Kievit'
  }
};

export { MyText };

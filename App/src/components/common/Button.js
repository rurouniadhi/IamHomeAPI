import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = ({ onPress, children, style }) => {
    const {
        buttonStyle,
        buttonTextStyle
    } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
            <Text style={buttonTextStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        padding: 10,
        margin: 20,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: '#000',
        fontSize: 22,
        textAlign: 'center'
    }

};

export { Button };

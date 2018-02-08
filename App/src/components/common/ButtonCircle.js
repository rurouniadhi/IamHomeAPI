import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const ButtonCircle = ({ onPress, children, style }) => {
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
        borderColor: '#000',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#64c46e',
        borderWidth: 0,
        width: 100,
        height: 100,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        elevation: 8,
    },
    buttonTextStyle: {
        textAlign: 'center',
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold'
    }

};

export { ButtonCircle };

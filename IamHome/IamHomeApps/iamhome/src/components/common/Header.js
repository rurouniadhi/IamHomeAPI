//import library
import React from 'react';
import { Text, View } from 'react-native';
//create component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.children}</Text>
        </View>
    );
};
const styles = {
    viewStyle: {
        height: 70,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        flex: 0
    },
    textStyle: {
        fontSize: 30,
        color: '#000'
    }
};
//make it available for other part
export { Header };

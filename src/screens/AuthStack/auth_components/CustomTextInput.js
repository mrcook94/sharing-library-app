import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import R from 'res/R'

import { pixelRatio } from 'screens/RootView'

export default class CustomTextInput extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name={this.props.iconName}
                    size={R.size.iconSize.iconTextInput}
                    color={R.colors.primaryColor}
                />
                <TextInput
                    placeholder={this.props.placeholder}
                    style={styles.textInputStyle}
                    placeholderTextColor={R.colors.primaryColor}
                    keyboardType={this.props.keyboardType}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                    placeholderTextColor={R.colors.primaryPlaceholderTextColor}
                    ref={input => { this.textInput = input }}
                    maxLength={this.props.maxLength}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: R.colors.primaryBorderColor,
        borderBottomWidth: 0.5,
        marginTop: 15,
    },

    textInputStyle: {
        alignItems: 'stretch',
        marginLeft: 10,
        fontSize: R.size.textSize.content,
        flex: 1,
        color: R.colors.primaryColor,
        paddingVertical: Platform.OS === "ios" ? 5 : 0,
    },
})
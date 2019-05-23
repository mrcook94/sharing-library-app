import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

import R from 'res/R'

export default class CustomTextinput extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleTextStyle}>{this.props.textinputTitle}</Text>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={styles.textInputStyle}
                    placeholderTextColor={R.colors.primaryColor}
                    keyboardType={this.props.keyboardType}
                    onChangeText={this.props.onChangeText}
                    placeholderTextColor={R.colors.primaryPlaceholderTextColor}
                    ref={input => { this.textInput = input }}
                    maxLength={this.props.maxLength}
                    returnKeyType={this.props.returnKeyType}
                    onSubmitEditing={this.props.onSubmitEditing}
                    multiline={this.props.multiline}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    titleTextStyle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
    },
    textInputStyle: {
        paddingVertical: 5,
        marginTop: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        marginHorizontal: 10,
        borderColor: R.colors.primaryBorderColor,
    }
})
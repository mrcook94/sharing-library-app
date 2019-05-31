import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PasswordInput from 'screens/auth_stack/custom_components/PasswordInput'

import R from 'res/R'

export default class ChangePasswordInput extends Component {
    render() {
        return (
            <View style={this.props.inputStyle}>
                <Text style={styles.textinputTitle}>{this.props.inputTitle}</Text>
                <PasswordInput
                    textHidden='Nhập mật khẩu'
                    isVisiblePassword={this.props.isVisiblePassword}
                    onChangeText={this.props.onChangeText}
                    handlePasswordVisible={this.props.handlePasswordVisible}
                    passInputStyle={styles.passInputStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textinputTitle: {
        fontSize: R.size.textSize.subTitle,
        color: R.colors.primaryBlackColor,
    },
    passInputStyle: {
        marginTop: 10,
    }
})
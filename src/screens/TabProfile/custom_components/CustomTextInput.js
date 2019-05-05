import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Platform } from 'react-native'
import BasicIcon from 'libraries/components/IconTemplate/BasicIcon'
import R from 'res/R'

export default class CustomTextInput extends Component {
    render() {
        return (
            <View style={styles.inputViewStyle} >
                <BasicIcon iconSource={this.props.iconSource} />
                <TextInput
                    style={[styles.textInputStyle, { color: this.props.editable ? 'black' : R.colors.primaryBlackColor }]}
                    value={this.props.textInputValue}
                    onChangeText={this.props.onChangeText}
                    multiline={this.props.multiline}
                    editable={this.props.editable}
                    onSubmitEditing = {this.props.onSubmitEditing}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputViewStyle: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.4,
        borderBottomColor: R.colors.primaryBorderColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: Platform.OS === "ios" ? 15 : 10,
    },
    textInputStyle: {
        fontSize: R.size.textSize.content,
        marginHorizontal: 15,
        paddingVertical: Platform.OS === "ios" ? 10 : 6,
        alignItems: 'stretch',
        flex: 1,
    }
})
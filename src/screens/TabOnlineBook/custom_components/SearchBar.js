import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Image } from 'react-native'
import R from 'res/R'

export default class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchContainer}>
                <Image source={R.images.icon_app.ic_search} resizeMode="contain" style={styles.iconSearchStyle} />
                <TextInput
                    placeholder='Tìm kiếm...'
                    style={styles.textInput}
                    placeholderTextColor= {R.colors.primaryBlurTextColor}
                    onChangeText={this.props.onChangeText}
                    returnKeyType='search'
                    ref={input => { this.textInput = input }}
                    onSubmitEditing={this.props.onSubmitEditing}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: R.colors.primaryBorderColor,
        borderRadius: 6,
        marginTop: 10,
        height: 40,
    },
    textInput: {
        flex: 1,
        alignItems: 'stretch',
        marginLeft: 5,
    },
    iconSearchStyle: {
        width: 20,
        height: 20,
        marginLeft: 8,
        tintColor: R.colors.grey500
    },
})
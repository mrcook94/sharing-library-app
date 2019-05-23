import React, { Component } from 'react'
import { Text, View, StyleSheet, WebView } from 'react-native'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'

import R from 'res/R'

export default class ReadOnlineScreen extends Component { 
    render() {
        const book_url = this.props.navigation.getParam('book_url', '')
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.read_online}
                    iconBack={true}
                />
                <WebView source={{uri: book_url}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
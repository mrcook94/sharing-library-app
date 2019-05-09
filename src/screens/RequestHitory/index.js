import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import RequestTopTabNavigator from './tab/TopTabNavigator'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'

import R from 'res/R'

export default class RequestHistoryScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.request_tab.main_tab}
                    iconBack={true}
                />
                <RequestTopTabNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
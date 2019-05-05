import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class GroupCategory extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default GroupCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import constants from 'libraries/utils/constants'

import R from 'res/R'

export default class NotificationItem extends Component {
    render() {
        const { notify_status } = this.props
        return (
            <View style={styles.iconContainer}>
                <Image
                    source={R.images.icon_app.ic_notify}
                    style={styles.iconStyle}
                    resizeMode='contain'
                />
                {notify_status ? null : <View style={styles.statusViewStyle} />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: R.colors.primaryBorderColor,
        marginTop: 5,
    },
    iconStyle: {
        width: 16,
        height: 16,
        tintColor: R.colors.primaryColor,
    },
    statusViewStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red'
    }
})
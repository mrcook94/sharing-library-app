import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

import R from 'res/R'

export default class BasicIcon extends Component {
    render() {
        return (
            <Image
                source={this.props.iconSource}
                style={styles.iconStyle}
            />
        )
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        width: R.size.iconSize.basic,
        height: R.size.iconSize.basic,
        tintColor: R.colors.primaryColor,
        resizeMode: 'contain'
    }
})
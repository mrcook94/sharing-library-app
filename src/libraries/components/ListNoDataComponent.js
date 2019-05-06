import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import R from 'res/R'
import { height } from 'screens/RootView'

export default class ListNoDataComponent extends Component {
    render() {
        return (
            <View style={styles.noneDataViewContainer}>
                <Image
                    source={this.props.imageNoData}
                    style={styles.noDataImageStyle}
                    resizeMode='contain'
                />
                <Text style={styles.noDataTextStyle}>{this.props.textNodata}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noneDataViewContainer: {
        width: '100%',
        height: height / 2,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataImageStyle: { width: 100, height: 100 },
    noDataTextStyle: {
        fontSize: R.size.textSize.content,
        color: R.colors.primaryBlurTextColor,
    },
})
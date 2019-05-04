import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import LogoIcon from 'react-native-vector-icons/FontAwesome5'

import R from 'res/R'

export default class LogoComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoStyle}>
                    <LogoIcon
                        name={'book-open'} color={R.colors.primaryWhiteColor}
                        size={R.size.iconSize.logoSize}
                    />
                </View>

                <Text style={styles.logoTextStyle}> {R.strings.appName} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoTextStyle: {
        fontSize: R.size.textSize.appLogoName,
        color: R.colors.primaryWhiteColor,
        fontWeight: '500',
        marginTop: 10,
    },
    logoStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
'use strict';

import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import QRCode from 'react-native-qrcode';
import { width } from 'screens/RootView'

import R from 'res/R'

export default class QRCodeScreen extends Component {
    render() {
        const data = this.props.navigation.getParam('data', '')
        return (
            <View style={styles.container} removeClippedSubviews={true}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.qr_code}
                    iconBack={true}
                />
                <Text style={styles.textStyle}>Quét mã này để xác nhận yêu cầu</Text>
                <View
                    style={styles.qrCodeView}
                    overflow={'hidden'}
                >
                    <QRCode
                        value={JSON.stringify(data)}
                        size={200}
                        bgColor={R.colors.primaryBlackColor}
                        fgColor='white'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    qrCodeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: R.size.textSize.subTitle,
        textAlign: 'center',
        marginTop: width / 3,
    }
})
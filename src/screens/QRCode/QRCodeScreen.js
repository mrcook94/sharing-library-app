'use strict';

import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import QRCode from 'react-native-qrcode';

import R from 'res/R'

export default class QRCodeScreen extends Component {
    render() {
        const data = this.props.navigation.getParam('data', '')
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.qr_code}
                    iconBack={true}
                />
                <View style={styles.qrCodeView}>
                    <Text style={styles.textStyle}>Quét mã này để xác nhận yêu cầu</Text>
                    <QRCode
                        value={'test_qr'}
                        size={200}
                        bgColor='purple'
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
        backgroundColor: 'red'
    },
    textStyle: {
        fontSize: R.size.textSize.content,
        textAlign: 'center',
        marginBottom: 20,
    }
})
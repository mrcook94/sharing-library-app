'use strict';

import React, { Component } from 'react'
import { Text, View, StyleSheet, BackHandler } from 'react-native'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import QRCode from 'react-native-qrcode';
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import { width, platfromOS } from 'screens/RootView'
import apis from 'libraries/networking/apis'
import { Status } from 'libraries/networking/status'
import { API_ENDING } from 'libraries/networking/apiEnding'
import NavigationService from 'routers/NavigationService'
import Toast from 'react-native-simple-toast'
import AlertModal from 'libraries/components/Modal/AlertModal'
import { APP_TAB } from 'libraries/utils/screenNames'

import R from 'res/R'

export default class QRCodeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
        }
    }
    render() {
        const data = this.props.navigation.getParam('data', '')
        return (
            <View style={styles.container} removeClippedSubviews={true}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.qr_code}
                    iconBack={true}
                    onPressBackButton={this.onPressBackButton}
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
                <BasicTextButton
                    buttonStyle={styles.buttonStyle}
                    text='Hủy yêu cầu'
                    textStyle={styles.textButtonStyle}
                    onPress={this.onPressCancelRequest}
                />
                <AlertModal
                    isModalVisible={this.state.isModalVisible}
                    onCloseModal={this.onCloseModal}
                    onPressActionOk={this.confirmModal}
                    confirmText='Đồng ý'
                    abortText='Huỷ'
                    modalTitle='Xác nhận'
                    modalContents='Bạn muốn huỷ yêu cầu này?'
                />
            </View>
        )
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onPressBackButton);
      }

    onPressCancelRequest = () => {
        this.setState({ isModalVisible: true })
    }

    onCloseModal = () => {
        this.setState({ isModalVisible: false })
    }

    confirmModal = () => {
        this.setState({ isModalVisible: false }, () => this.cancelRequestApi())
    }

    cancelRequestApi = () => {
        const data = this.props.navigation.getParam('data', '')
        const url = `${API_ENDING.REQUEST}/${data.request_id}`
        apis.del(url, apis.IS_AUTH.YES)
            .then(res => {
                if (res && res.ok == Status.OK) {
                    Toast.show('Đã huỷ yêu cầu')
                    NavigationService.reset(APP_TAB)
                } else {
                    Toast.show('Có lỗi xảy ra')
                }
            })
            .catch(err => {
                Toast.show('Có lỗi xảy ra')
                console.log(err, 'ERRR')
            })
    }

    onPressBackButton = () => {
        NavigationService.reset(APP_TAB)
        return true
    }

    componentWillUnmount() {
        this.backHandler.remove()
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
    },
    buttonStyle: {
        width,
        paddingVertical: platfromOS == 'android' ? 10 : 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: R.colors.primaryColor,
    },
    textButtonStyle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
        color: R.colors.primaryWhiteColor
    }
})
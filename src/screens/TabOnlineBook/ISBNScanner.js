import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera';
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import { showLoading, hideLoading } from 'libraries/components/Loading/LoadingModal'
import apis from 'libraries/networking/book-apis'
import Toast from 'react-native-simple-toast'

import R from 'res/R'
import NavigationService from 'routers/NavigationService';
import { PREVIEW_ONLINE_BOOK_SCREEN } from 'libraries/utils/screenNames'

export default class ISBNScanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            canReadCode: true
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.isbn_scanner}
                    iconBack={true}
                />
                {/* <Text style={{marginTop: 40, fontSize: 16, textAlign: 'center'}}>Quét mã ở đây</Text> */}
                <View style={styles.cameraViewStyle}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.cameraStyle}
                        onGoogleVisionBarcodesDetected={this.barcodeRecognized}
                    >
                    </RNCamera>
                </View>
            </View>
        )
    }

    barcodeRecognized = ({ barcodes }) => {
        if (this.state.canReadCode) {
            showLoading()
            this.setTimeOutReadCode()
            const data = {
                q: `isbn:${barcodes[0].data}`
            }
            apis.fetch(apis.ENDING.VOLUMES, data)
                .then(res => {
                    hideLoading()
                    if (res.totalItems != 0) {
                        NavigationService.navigate(PREVIEW_ONLINE_BOOK_SCREEN, { book_data: res.items[0] })
                        return
                    }
                    Toast.show('Không tìm thấy sách này')
                })
                .catch(err => {
                    hideLoading()
                    console.log(err)
                })
        } else {
            console.log('nononono')
        }
    };

    setTimeOutReadCode = () => {
        this.setState({ canReadCode: false })
        setTimeout(() => {
            this.setState({ canReadCode: true })
        }, 10000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraStyle: {
        width: '60%',
        height: '60%',
    }
})
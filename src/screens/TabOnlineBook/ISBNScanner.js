import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera';

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
                <View style={styles.cameraViewStyle}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{
                            width: '50%',
                            height: '50%',
                            alignSelf: 'center'
                        }}
                        onGoogleVisionBarcodesDetected={this.barcodeRecognized}
                    >
                    </RNCamera>
                </View>
            </View>
        )
    }

    barcodeRecognized = ({ barcodes }) => {
        if (this.state.canReadCode) {
            this.setTimeOutReadCode()
            console.log(barcodes, 'CODEEEEEE')
        } else {
            console.log('nononono')
        }
    };

    setTimeOutReadCode = () => {
        this.setState({ canReadCode: false })
        setTimeout(() => {
            this.setState({ canReadCode: true })
        }, 5000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraViewStyle: {
        
    }
})
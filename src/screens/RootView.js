import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Dimensions, PixelRatio, Platform } from 'react-native';
import NoInternetScreen from 'screens/NoInternetScreen'
import OneSignal from 'react-native-onesignal';

export const HEADER_HEIGHT = 55
export const { height, width } = Dimensions.get('screen')
export const pixelRatio = PixelRatio.get()
export const platfromOS = Platform.OS


import R from 'res/R'

class RootView extends Component {
    constructor(props) {
        super(props);
        OneSignal.init("b6156a27-6e04-4cc2-b354-8aeb99da4210");

        OneSignal.inFocusDisplaying(2)
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={R.colors.primaryColor}
                    barStyle="light-content"
                />
                {this.props.children}
                {/* <NoInternetScreen /> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default RootView;

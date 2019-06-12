import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Dimensions, PixelRatio, Platform } from 'react-native';
import NoInternetScreen from 'screens/NoInternetScreen'
import OneSignal from 'react-native-onesignal';
import { loadingNotificationAction, readNotifyAction } from '../redux/actions/notifyActions'
import NavigationService from 'routers/NavigationService'
import constants from 'libraries/utils/constants'
import { REQUEST_HISTORY_SCREEN, DETAIL_PROFILE_SCREEN, APP_TAB } from 'libraries/utils/screenNames'

import { connect } from 'react-redux'

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

    onReceived = (notification) => {
        console.log("Notification received: ", notification);
        const { type } = notification.payload.additionalData
        if (type == constants.NOTIFY_TYPE.CONFIRM_REQUEST || type == constants.NOTIFY_TYPE.RETURN_BOOK) {
            NavigationService.reset(APP_TAB)
        }
        this.receivedNotifyAction()
    }
    receivedNotifyAction = () => {
        const data = {
            page: 1,
            per_page: 10,
        }
        this.props.loadingNotificationAction(data)
    }

    onOpened = (openResult) => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
        const { type, data } = openResult.notification.payload.additionalData
        this.props.readNotifyAction({ onesignal_id: openResult.notification.payload.notificationID })
        switch (type) {
            case constants.NOTIFY_TYPE.REQUEST:
                NavigationService.navigate(REQUEST_HISTORY_SCREEN, { item: data })
                break;
            case constants.NOTIFY_TYPE.REMIND:

                break;
            case constants.NOTIFY_TYPE.POINT:
                NavigationService.navigate(DETAIL_PROFILE_SCREEN)
                break;

            case constants.NOTIFY_TYPE.RANK_CHANGE:
                NavigationService.navigate(DETAIL_PROFILE_SCREEN)
                break;

            case constants.NOTIFY_TYPE.CONFIRM_REQUEST:
                NavigationService.navigate(REQUEST_HISTORY_SCREEN, { item: data })
                break;

            case constants.NOTIFY_TYPE.RETURN_BOOK:
                NavigationService.navigate(REQUEST_HISTORY_SCREEN, { item: data })
                break;
            default: break;
        }
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

export default connect(null, {
    loadingNotificationAction,
    readNotifyAction,
})(RootView);

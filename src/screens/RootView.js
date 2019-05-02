import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Dimensions, PixelRatio, Platform } from 'react-native';
import NoInternetScreen from 'screens/NoInternetScreen'

export const HEADER_HEIGHT = 55
export const { height, width } = Dimensions.get('screen')
export const pixelRatio = PixelRatio.get()
export const platfromOS = Platform.OS


import R from 'res/R'

class RootView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={R.colors.primaryColor}
                    barStyle="light-content"
                />
                {this.props.children}
                <NoInternetScreen />
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

import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { pixelRatio } from 'screens/RootView'

import R from 'res/R'


class LoadingComponent extends Component {
    render() {
        const loadingSize = pixelRatio <= 2 ? 'small' : 'large'
        return (
            <View style={[styles.container, this.props.loadingStyle]}>
                <ActivityIndicator size={loadingSize} color={R.colors.primaryColor} />
            </View>
        );
    }
}

export default LoadingComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

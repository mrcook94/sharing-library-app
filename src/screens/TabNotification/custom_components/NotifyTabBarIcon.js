import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { pixelRatio } from 'screens/RootView'

import { connect } from 'react-redux'

class NotifyTabBarIcon extends Component {
    render() {
        const { badgeCount } = this.props;
        return (
            <View style={styles.iconContainerStyle}>
                <Image
                    source={this.props.iconSource}
                    style={this.props.iconStyle}
                />
                {badgeCount > 0 && (
                    <View style={styles.badgesViewStyle}>
                        <Text style={styles.badgesTextStyle}>{badgeCount <= 99 ? badgeCount : 99}</Text>
                    </View>
                )}
            </View>
        );
    }
}

export default connect((state) => {
    return {
        badgeCount: state.notifyReducer.totalUnreadNotify
    }
}, null)(NotifyTabBarIcon)

const styles = StyleSheet.create({
    iconContainerStyle: {
        width: 24,
        height: 24,
    },
    badgesViewStyle: {
        position: 'absolute',
        right: pixelRatio <= 2 ? 0 : -2,
        top: 1,
        backgroundColor: 'red',
        borderRadius: pixelRatio <= 2 ? 7.5 : 8,
        width: pixelRatio <= 2 ? 15 : 16,
        height: pixelRatio <= 2 ? 15 : 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgesTextStyle: {
        color: 'white',
        fontSize: pixelRatio <= 2 ? 8 : 9,
        fontWeight: 'bold',
    }
})
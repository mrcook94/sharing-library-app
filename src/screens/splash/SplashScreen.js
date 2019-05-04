import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import NavigationService from 'routers/NavigationService'
import { AUTH_STACK, APP_TAB } from 'libraries/utils/screenNames'
import Database from 'libraries/utils/database'
import LogoComponent from './custom_components/LogoComponent'
import LinearGradient from 'react-native-linear-gradient'

import R from 'res/R'

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onStartingApp}>
                <LinearGradient
                    colors={[R.colors.primaryGradientEnd, R.colors.primaryColor, R.colors.blue900]}
                    style={styles.linearGradient}
                >
                    <View style={styles.container} >
                        <LogoComponent />
                        <Text style={styles.introTextStyle}>{R.strings.intro}</Text>
                        <Text style={styles.copyRightTextStyle}>{R.strings.copy_right}</Text>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount = () => {
        this.loadingTimeout = setTimeout(() => this.onStartingApp(), 3000);
    };

    onStartingApp = async () => {
        const userToken = await Database.get(Database.KEY.TOKEN)
        if (userToken) {
            Database.setUserToken(userToken)
            NavigationService.reset(APP_TAB)
        }
        else {
            NavigationService.reset(AUTH_STACK)
        }
    }

    componentWillUnmount() {
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
        padding: 20,
    },
    introTextStyle: {
        fontSize: R.size.textSize.subTitle,
        color: R.colors.primaryWhiteColor,
        textAlign: 'center',
        marginBottom: 40,
    },
    copyRightTextStyle: {
        fontSize: R.size.textSize.content,
        color: R.colors.primaryWhiteColor,
    }
});

export default SplashScreen;

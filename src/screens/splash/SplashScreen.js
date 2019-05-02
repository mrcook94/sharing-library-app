import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import NavigationService from 'routers/NavigationService'
import { AUTH_STACK, APP_TAB } from 'libraries/utils/screenNames'
import Icon from 'react-native-vector-icons/FontAwesome5';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: true
        };
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onStartingApp}>
                <View style={styles.container}>
                    <Text>Welcome to my Library</Text>
                    <Text>Developed by TruongLe</Text>
                    <Icon
                        name={'comments'} solid
                        size={30}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount = () => {
        setTimeout(this.onStartingApp, 3000)
    };

    onStartingApp = () => {
        if (this.state.isFocused) {
            this.setState({
                isFocused: false
            }, NavigationService.reset(AUTH_STACK))
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SplashScreen;

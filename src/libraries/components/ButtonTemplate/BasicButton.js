import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

export class BasicTextButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func,
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={this.props.buttonStyle}
                disabled={this.props.disabled}
                >
                <Text style={this.props.textStyle}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

export class BasicImageButton extends Component {
    static propTypes = {
        imageStyle: PropTypes.object,
        onPress: PropTypes.func,
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[this.props.buttonStyle, styles.buttonLeft]}>
                <Image
                    source={this.props.imageSource}
                    style={this.props.imageStyle}
                />
            </TouchableOpacity>
        );
    }
}

export class LinearGradientButton extends Component {
    static propTypes = {
        gradientColors: PropTypes.array.isRequired,
    }
    render() {
        return (
            <LinearGradient
                colors={this.props.gradientColors} style={this.props.linearGradientButtonStyle}
                start={this.props.gradientStart} end={this.props.gradientEnd}
            >
                <TouchableOpacity onPress={this.props.onPress} style={styles.buttonStyle}>
                    {this.props.children}
                </TouchableOpacity>
            </LinearGradient>

        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
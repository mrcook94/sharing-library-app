import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import R from 'res/R';

class BaseInput extends Component {

    static propTypes = {
        style: PropTypes.object
    }

    render() {
        return (
            <TextInput
                {...this.props}
                style={[styles.textInputStyle, this.props.style]}

            />
        );
    }
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: '78%',
        borderBottomColor: R.colors.primaryColor,
        borderBottomWidth: 0.8,
        padding: 5,
        marginBottom: 5
    }
})

export default BaseInput;

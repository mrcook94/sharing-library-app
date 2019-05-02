import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

export default class DismissKeyboard extends PureComponent{
    render() {
        return(
            <TouchableWithoutFeedback style={this.props.style} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableWithoutFeedback>
        )
    }
}

DismissKeyboard.defaultProps = {
    onPress: () => { Keyboard.dismiss() },
    style: {
        flex: 1,
    }
}

DismissKeyboard.propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired
}
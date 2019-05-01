import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import R from 'res/R';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

class BaseButtonOpacity extends Component {

  static propTypes = {
    containerStyle: PropTypes.object,
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.object,
    onPress: PropTypes.func,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.containerStyle, this.props.containerStyle]}>
        <Icon name={this.props.name} size={this.props.size} color={this.props.color}/>
        <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '78%',
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.primaryColor,
    flexDirection: 'row',
    textAlign: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 8
  },
})

export default BaseButtonOpacity;

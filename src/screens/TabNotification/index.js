import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'

import R from 'res/R'

export default class NotificationScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Thông báo',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name={'bell'}
				size={R.size.iconSize.tabBarIcon}
				color={tintColor}
			/>
		)
	};

	render() {
		return (
			<View style={styles.container}>
				<DefaultHeader
					headerTitle={R.strings.headerTitle.notification}
				/>
				<Text> Thông báo </Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
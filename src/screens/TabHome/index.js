import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'

import R from 'res/R'

export default class HomeScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Trang chủ',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name={'ios-home'}
				size={R.size.iconSize.tabBarIcon}
				color={tintColor}
			/>
		)
	};
	render() {
		return (
			<View style={styles.container}>
				<DefaultHeader
					headerTitle={R.strings.headerTitle.home}
				/>
				<Text> Home Screen </Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})
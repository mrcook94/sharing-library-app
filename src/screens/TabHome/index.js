import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'

import { loadProfileAction } from '../../redux/actions/profileActions'
import { connect } from 'react-redux'
import R from 'res/R'

class HomeScreen extends Component {
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

	componentDidMount() {
		this.props.loadProfile()
	}
	
}

export default connect(null, {
	loadProfile: loadProfileAction,
})(HomeScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})
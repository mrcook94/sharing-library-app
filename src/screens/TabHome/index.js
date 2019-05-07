import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import GroupCategory from './GroupCategory'
import GroupBookHome from './GroupBookHome'
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ flex: 1 }}>
						<GroupCategory />
						<GroupBookHome />
					</View>
				</ScrollView>

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
		backgroundColor: R.colors.primaryGrayColor,
	},
})
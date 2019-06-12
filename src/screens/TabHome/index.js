import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import GroupCategory from './GroupCategory'
import GroupBookHome from './GroupBookHome'
import { loadProfileAction } from '../../redux/actions/profileActions'
import { loadingNotificationAction } from '../../redux/actions/notifyActions'
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
					iconAdd={true}
				/>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							onRefresh={this.onRefreshHomeScreen}
							refreshing={this.props.isLoadingProfile}
						/>}
				>
					<View style={{ flex: 1 }}>
						<GroupCategory ref={refs => { this.groupCategory = refs }} />
						<GroupBookHome ref={refs => { this.groupBookHome = refs }} />
					</View>
				</ScrollView>

			</View>
		)
	}

	componentDidMount() {
		const data = {
			page: 1,
			per_page: 8,
		}
		this.props.loadProfile()
		this.props.loadingNotificationAction(data)
	}

	onRefreshHomeScreen = () => {
		const data = {
			page: 1,
			per_page: 8,
		}
		this.props.loadProfile()
		this.props.loadingNotificationAction(data)
		this.groupBookHome.onLoadData()
		this.groupCategory.onLoadData()
	}

}

export default connect(state => {
	return {
		isLoadingProfile: state.profileReducer.isLoadingProfile
	}
}, {
		loadProfile: loadProfileAction,
		loadingNotificationAction,
	})(HomeScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: R.colors.primaryGrayColor,
	},
})
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import Database from 'libraries/utils/database'
import NavigationService from 'routers/NavigationService'
import { AUTH_STACK } from 'libraries/utils/screenNames'
import Icon from 'react-native-vector-icons/FontAwesome5'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'

import R from 'res/R'

export default class ProfileScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Cá nhân',
		tabBarIcon: ({ tintColor }) => (
			<Icon
				name={'user'}
				size={R.size.iconSize.tabBarIcon}
				color={tintColor}
			/>
		)
	};
	render() {
		return (
			<View style={styles.container}>
				<DefaultHeader
					headerTitle={R.strings.headerTitle.profile}
				/>
				<View style={styles.profileContentStyle}>
					<BasicTextButton
						onPress={this.onLogOut}
						buttonStyle={styles.logOutButtonStyle}
						text='Đăng xuất'
						textStyle={styles.logOutTextStyle}
					/>
				</View>
			</View>
		)
	}
	onLogOut = () => {
		Database.removeItem(Database.KEY.TOKEN)
		NavigationService.reset(AUTH_STACK)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profileContentStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logOutButtonStyle: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: R.colors.primaryColor,
	},
	logOutTextStyle: {
		fontSize: R.size.textSize.content,
		fontWeight: '500',
		color: R.colors.primaryWhiteColor,
	}
})
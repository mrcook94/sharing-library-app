import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import R from 'res/R'
import NavigationService from 'routers/NavigationService';
import { LOGIN_SCREEN, APP_TAB } from 'libraries/utils/screenNames'
import Database from 'libraries/utils/database'
import Validate from 'libraries/utils/utils'
import { oneSignalSendTag } from 'libraries/utils/utils'
import Toast from 'react-native-simple-toast';
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import CustomTextInput from './auth_components/CustomTextInput'
import { BasicTextButton, LinearGradientButton } from 'libraries/components/ButtonTemplate/BasicButton'
import { pixelRatio } from 'screens/RootView'
import LogoComponent from './auth_components/LogoComponent'
import { hideLoading, showLoading } from 'libraries/components/Loading/LoadingModal'


export default class RegisterScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			phone_number: '',
			password: '',
			full_name: ''
		}
	}
	render() {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardDismissMode='on-drag'
			>
				<View style={styles.container}>
					<LogoComponent />
					<View style={styles.groupInputStyle}>
						<CustomTextInput
							placeholder={'Họ và tên'}
							iconName={'user'}
							onChangeText={this.onChangeText('full_name')}
							returnKeyType='next'
							onSubmitEditing={this.onSubmitName}
							ref={refs => { this.nameInput = refs }}
						/>

						<CustomTextInput
							placeholder={'Số điện thoại'}
							iconName={'mobile-alt'}
							onChangeText={this.onChangeText('phone_number')}
							keyboardType={'phone-pad'}
							maxLength={10}
							returnKeyType='next'
							onSubmitEditing={this.onSubmitPhone}
							ref={refs => { this.phoneInput = refs }}
						/>

						<CustomTextInput
							placeholder={'Mật khẩu'}
							iconName='lock'
							onChangeText={this.onChangeText('password')}
							secureTextEntry={true}
							returnKeyType='send'
							onSubmitEditing={this.onSubmitPass}
							ref={refs => { this.passInput = refs }}
						/>
					</View>
					<LinearGradientButton
						gradientColors={[R.colors.primaryGradientStart, R.colors.primaryGradientEnd]}
						linearGradientButtonStyle={styles.buttonStyle}
						onPress={this.onClickRegister}
						gradientStart={{ x: 0.0, y: 1.0 }} gradientEnd={{ x: 1.0, y: 1.0 }}
					>
						<Text style={styles.buttonText}>ĐĂNG KÝ</Text>
					</LinearGradientButton>

					<View style={styles.otherSituation}>
						<Text style={styles.defaultText}>Bạn đã có tài khoản?</Text>
						<BasicTextButton
							buttonStyle={styles.defaulButtonStyle}
							text='Đăng nhập.'
							textStyle={[styles.defaultText, styles.otherStyleText]}
							onPress={this.onClickLoginNow}
						/>
					</View>
				</View>
			</ScrollView>
		)
	}

	onChangeText = type => text => {
		this.setState({ [type]: text });
	};

	onSubmitName = () => {
		this.nameInput.onBlurTextInput()
		this.phoneInput.onFocusTextInput()
	}

	onSubmitPhone = () => {
		this.phoneInput.onBlurTextInput()
		this.passInput.onFocusTextInput()
	}

	onSubmitPass = () => {
		this.onClickRegister()
	}

	onClickRegister = () => {
		const { phone_number, password, full_name } = this.state

		if (full_name.length == 0) {
			Toast.show('Mời bạn nhập họ tên')
			return
		}

		if (phone_number.length == 0) {
			Toast.show('Mời bạn nhập số điện thoại')
			return
		}

		if (password.length < 6) {
			Toast.show('Mật khẩu cần ít nhất 6 ký tự')
			return
		}
		const validateName = Validate.Regex.regexName(full_name)
		const validatePhone = Validate.Regex.regexPhone(phone_number)
		if (validateName.validated) {
			if (validatePhone.validated) {
				showLoading()
				let data = {
					name: full_name,
					phone: phone_number,
					password: password,
				}
				apis.post(API_ENDING.REGISTER, data, apis.IS_AUTH.NO)
					.then((res) => {
						if (res && res.ok === Status.OK) {
							oneSignalSendTag(res.data.info._id)
							Database.save(Database.KEY.TOKEN, res.data.token)
							Database.setUserToken(res.data.token)
							NavigationService.reset(APP_TAB)
							hideLoading()
							Toast.show('Đăng ký thành công')
						}
						else {
							hideLoading()
							Toast.show(res.message)
						}
					})
					.catch((err) => {
						hideLoading()
						Toast.show('Đăng ký thất bại.')
					})
			} else {
				Toast.show(validatePhone.message)
			}
		} else {
			Toast.show(validateName.message)
		}
	}

	onClickLoginNow = () => {
		NavigationService.navigate(LOGIN_SCREEN)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	buttonText: {
		color: R.colors.primaryWhiteColor,
		fontSize: pixelRatio <= 2 ? 14 : 16,
		fontWeight: '700'
	},
	buttonStyle: {
		backgroundColor: '#01B6EF',
		borderRadius: 5,
		width: '80%',
		height: pixelRatio <= 2 ? 40 : 50,
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	groupInputStyle: {
		alignItems: 'center',
	},
	otherSituation: {
		flexDirection: 'row',
		marginTop: 30,
	},
	defaultText: {
		fontSize: R.size.textSize.subContent,
	},
	defaulButtonStyle: {
		alignItems: 'center'
	},
	otherStyleText: {
		color: R.colors.primaryColor,
		marginLeft: 5,
		fontWeight: '500'
	}
})
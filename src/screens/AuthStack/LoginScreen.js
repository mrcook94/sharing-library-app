import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import R from 'res/R'
import NavigationService from 'routers/NavigationService';
import { REGISTER_SCREEN, APP_TAB } from 'libraries/utils/screenNames'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import Database from 'libraries/utils/database'
import Validate from 'libraries/utils/utils'
import Toast from 'react-native-simple-toast';
import CustomTextInput from './auth_components/CustomTextInput'
import { BasicTextButton, LinearGradientButton } from 'libraries/components/ButtonTemplate/BasicButton'
import { pixelRatio } from 'screens/RootView'
import LogoComponent from './auth_components/LogoComponent'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone_number: '',
            password: ''
        }
    }
    render() {
        return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <LogoComponent/>
                        <View style={styles.groupInputStyle}>
                            <CustomTextInput
                                placeholder={'Số điện thoại'}
                                iconName={'mobile-alt'}
                                onChangeText={this.onChangeText('phone_number')}
                                keyboardType={'phone-pad'}
                                maxLength={10}
                            />

                            <CustomTextInput
                                placeholder={'Mật khẩu'}
                                iconName='lock'
                                onChangeText={this.onChangeText('password')}
                                secureTextEntry={true}
                            />
                        </View>

                        <LinearGradientButton
                            gradientColors={[R.colors.primaryGradientStart, R.colors.primaryGradientEnd]}
                            linearGradientButtonStyle={styles.buttonStyle}
                            onPress={this.onClickLogin}
                            gradientStart={{ x: 0.0, y: 1.0 }} gradientEnd={{ x: 1.0, y: 1.0 }}
                        >
                            <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                        </LinearGradientButton>

                        <View style={styles.otherSituation}>
                            <Text style={styles.defaultText}>Bạn chưa có tài khoản?</Text>
                            <BasicTextButton
                                buttonStyle={styles.defaulButtonStyle}
                                text='Đăng ký.'
                                textStyle={[styles.defaultText, styles.otherStyleText]}
                                onPress={this.onClickRegisterNow}
                            />
                        </View>
                    </View>
                </ScrollView>
        )
    }

    onChangeText = type => text => {
        this.setState({ [type]: text });
    };

    onClickLogin = () => {
        const { phone_number, password } = this.state

        if (phone_number.length == 0) {
            Toast.show('Mời bạn nhập số điện thoại')
            return
        }

        if (password.length == 0) {
            Toast.show('Mời bạn nhập mật khẩu')
            return
        }

        const validatePhone = Validate.Regex.regexPhone(phone_number)
        if (validatePhone.validated) {
            const data = {
                phone: phone_number,
                password: password
            }
            apis.post(API_ENDING.LOGIN, data, apis.IS_AUTH.NO)
                .then((res) => {
                    if (res && res.ok === Status.OK) {
                        Database.save(Database.KEY.TOKEN, res.data.token)
                        Database.setUserToken(res.data.token)
                        NavigationService.reset(APP_TAB)
                        Toast.show('Đăng nhập thành công')
                        return
                    }
                    else {
                        Toast.show(res.message)
                    }
                })
                .catch((err) => {
                    Toast.show('Đăng nhập thất bại')
                })
        } else {
            Toast.show(validatePhone.message)
        }
    }

    onClickRegisterNow = () => {
        NavigationService.navigate(REGISTER_SCREEN)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
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
        alignItems: 'center'
    },
    groupInputStyle: {
        alignItems: 'center',
    },
    defaultText: {
        fontSize: R.size.textSize.subContent,
    },
    otherSituation: {
        flexDirection: 'row',
        marginTop: 30,
    },
    defaultText: {
        fontSize: pixelRatio <= 2 ? 12 : 14,
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
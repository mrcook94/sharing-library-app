import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import R from 'res/R'
import ProfileHeader from './custom_components/ProfileHeader'
import { HEADER_HEIGHT } from 'libraries/components/HeaderTemplate/DefaultHeader'
import Avatar from './custom_components/Avatar'
import { BasicTextButton, BasicImageButton } from 'libraries/components/ButtonTemplate/BasicButton'
import CustomTextInput from './custom_components/CustomTextInput'
import { pixelRatio, platfromOS } from 'screens/RootView'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import { updateProfileAction } from '../../redux/actions/profileActions'
import BasicIcon from 'libraries/components/IconTemplate/BasicIcon.js'
import NavigationService from 'routers/NavigationService'
import Toast from 'react-native-simple-toast'
import Validate from 'libraries/utils/utils'
import { showLoading, hideLoading } from 'libraries/components/Loading/LoadingModal'
import DismissKeyboard from 'libraries/components/DismissKeyboard'

import { connect } from 'react-redux'

class DetailProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            name: '',
            phone: '',
            address: '',
        }
    }

    render() {
        const { userProfile } = this.props
        const { name, phone, address, isEditing } = this.state
        let user_rank
        switch (userProfile.rank) {
            case 0:
                user_rank = 'Đồng'
                break;
            case 1:
                user_rank = 'Bạc'
                break;
            case 2:
                user_rank = 'Vàng'
                break;
            default: break
        }
        return (
            <DismissKeyboard>
                <View style={styles.container}>
                    <ProfileHeader
                        iconBack={true}
                        headerTitle={R.strings.headerTitle.detail_profile}
                        onPressBackButton={this.onPressBackButton}
                    />
                    <View style={styles.profileContainer}>
                        <View style={styles.profileView}>
                            <View style={styles.avatarGroupStyle}>
                                <Avatar
                                    avatarViewStyle={styles.avatarStyle}
                                    avatarUrl={userProfile.avatar}
                                    disabled={!isEditing}
                                    ref={(refs) => { this.avatar = refs }}
                                    isEdit={isEditing}
                                />
                                <View style={[styles.nameViewStyle, { marginLeft: isEditing ? 0 : 30 }]}>
                                    <Text style={styles.nameTextStyle}>{userProfile.name}</Text>
                                    {!isEditing && (
                                        <BasicImageButton
                                            onPress={this.onPressEditButton}
                                            buttonStyle={styles.editButtonStyle}
                                            imageSource={R.images.icon_app.ic_edit}
                                            imageStyle={styles.iconButtonStyle}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.listInfoStyle}>
                                <CustomTextInput
                                    iconSource={R.images.profile.ic_profile}
                                    textInputValue={isEditing ? name : userProfile.name}
                                    editable={this.state.isEditing}
                                    onChangeText={this.onChangeText('name')}
                                />
                                <CustomTextInput
                                    iconSource={R.images.profile.ic_phone}
                                    textInputValue={isEditing ? phone : userProfile.phone}
                                    onChangeText={this.onChangeText('phone')}
                                    editable={this.state.isEditing}
                                />
                                <CustomTextInput
                                    iconSource={R.images.profile.ic_ranking}
                                    textInputValue={`Thành viên cấp ${user_rank}`}
                                    editable={false}
                                />
                                <CustomTextInput
                                    iconSource={R.images.profile.ic_point}
                                    textInputValue={`${userProfile.point.toString()} điểm`}
                                    editable={false}
                                />
                                <CustomTextInput
                                    iconSource={R.images.profile.ic_address}
                                    textInputValue={isEditing ? address : userProfile.address}
                                    multiline={true}
                                    onChangeText={this.onChangeText('address')}
                                    editable={this.state.isEditing}
                                />
                                {this.state.isEditing && (<BasicTextButton
                                    onPress={this.onPressEditButton}
                                    buttonStyle={styles.buttonStyle}
                                    textStyle={styles.textButtonStyle}
                                    text={'LƯU'}
                                />)}
                            </View>
                        </View>
                    </View>
                </View>
            </DismissKeyboard>
        )
    }

    componentDidMount = () => {
        const { userProfile } = this.props
        this.setState({
            name: userProfile.name,
            phone: userProfile.phone,
            address: userProfile.address,
        })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onPressBackButton);
    };

    componentDidUpdate = () => {
        if (this.props.isProfileUpdating) {
            showLoading()
        } else {
            this.avatar.resetAvatar()
            hideLoading()
        }
    }

    onPressBackButton = () => {
        if (this.state.isEditing) {
            this.setState({ isEditing: false })
            this.avatar.resetAvatar()
            return true
        }
        NavigationService.pop()
        return true
    }

    onChangeText = type => text => {
        this.setState({ [type]: text });
    };

    onPressEditButton = () => {
        if (this.state.isEditing) {
            this.onSaveProfile()
        }
        this.setState((prev) => {
            return {
                isEditing: !prev.isEditing
            }
        })
    }

    onSaveProfile = () => {
        const avatar = this.avatar.state.avatarData;
        const { name, phone, address } = this.state
        const { userProfile, updateProfileAction } = this.props
        const data = { name, phone, address }
        let validated_data = {}

        if (phone.length == 0) {
            Toast.show('Số điện thoại không được để trống')
            return
        }

        if (name.length == 0) {
            Toast.show('Tên không được để trống')
            return
        }

        if (name === userProfile.name && phone === userProfile.phone && address === userProfile.address && avatar === '') {
            Toast.show('Bạn chưa thay đổi gì')
            return
        }

        const validatePhone = Validate.Regex.regexPhone(data.phone)
        const validateName = Validate.Regex.regexName(data.name)
        if (validatePhone.validated) {
            if (validateName.validated) {
                Object.keys(data).map(value => {
                    if (data[value] !== userProfile[value])
                        Object.assign(validated_data, { [value]: data[value] })
                })
                if (!!avatar && !!avatar.uri && !!avatar.name && !!avatar.type) {
                    Object.assign(validated_data, { avatar: avatar })
                }
                updateProfileAction(validated_data)
            }
            else {
                Toast.show(validateName.message)
            }
        } else {
            Toast.show(validatePhone.message)
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

}

export default connect(state => state.profileReducer, {
    updateProfileAction,
})(DetailProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.primaryGrayColor,
        alignItems: 'center'
    },
    profileContainer: {
        alignItems: 'center',
        marginHorizontal: 15,
    },
    profileView: {
        position: 'absolute',
        top: -(HEADER_HEIGHT + 10),
        width: '100%',
        borderRadius: 8,
    },
    avatarGroupStyle: {
        borderRadius: 8,
        backgroundColor: R.colors.primaryWhiteColor,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
    },
    avatarStyle: {
        position: 'absolute',
        top: pixelRatio <= 2 ? -40 : -50,
    },
    nameTextStyle: {
        fontSize: R.size.textSize.title,
        textAlign: 'center'
    },
    nameViewStyle: {
        marginTop: pixelRatio <= 2 ? 30 : 40,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    listInfoStyle: {
        width: '100%',
        marginTop: 10,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: pixelRatio <= 2 ? 30 : 40,
        backgroundColor: R.colors.primaryWhiteColor,
        borderRadius: 8,
    },
    buttonStyle: {
        marginTop: 20,
        borderRadius: 25,
        justifyContent: 'center',
        width: 90,
        height: 35,
        alignSelf: 'center',
        backgroundColor: R.colors.primaryColor
    },
    textButtonStyle: {
        fontSize: R.size.textSize.content,
        fontWeight: '500',
        textAlign: 'center',
        color: R.colors.primaryWhiteColor,
    },
    dateTextStyle: {
        fontSize: R.size.textSize.content,
        color: R.colors.primaryBlackColor,
        width: '100%',
        backgroundColor: R.colors.primaryWhiteColor,
        height: platfromOS === 'ios' ? null : '100%',
        textAlignVertical: 'center',
    },
    datepickerContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.4,
        borderBottomColor: R.colors.primaryBorderColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    editButtonStyle: {
        marginLeft: 10
    },
    iconButtonStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: R.colors.primaryColor,
    }
})

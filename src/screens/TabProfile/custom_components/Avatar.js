import ImagePicker from 'react-native-image-picker';
import { Dimensions, Image, TouchableOpacity, StyleSheet, Keyboard, View } from 'react-native';
import React, { Component } from 'react';
import R from "res/R";
import { pixelRatio } from 'screens/RootView'
import { URL_IMAGE } from 'libraries/utils/imageUrl'

const options = {
    title: 'Chọn ảnh đại diện',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Avatar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarData: '',
        }
    }
    changeAvatar = () => {
        Keyboard.dismiss();
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const imgData = {
                    uri: response.uri,
                    name: `${new Date().getTime()}.png`,
                    type: response.type,
                };
                this.setState({
                    avatarData: imgData
                });
            }
        });
    }
    render() {
        const { avatarUrl, isEdit } = this.props
        const avatarFromProps = avatarUrl ? { uri: URL_IMAGE.urlUserAvatar(avatarUrl) } : R.images.default_image.img_avatar
        const chosenAvatar = this.state.avatarData.uri ? { uri: this.state.avatarData.uri } : avatarFromProps
        const displayAvatar = isEdit ? chosenAvatar : avatarFromProps
        return (
            <TouchableOpacity
                style={this.props.avatarViewStyle}
                onPress={this.changeAvatar}
                disabled={this.props.disabled}
            >
                <Image
                    source={displayAvatar}
                    style={styles.avatarImageStyle}
                />
                {
                    isEdit && (
                        <View style={styles.cameraViewStyle}>
                            <Image
                                source={R.images.profile.ic_camera}
                                style={styles.cameraImageStyle}
                            />
                        </View>
                    )
                }
            </TouchableOpacity>
        )
    }

    resetAvatar = () => {
        this.setState({ avatarData: '' })
    }
}

const styles = StyleSheet.create({
    avatarImageStyle: {
        width: pixelRatio <= 2 ? 80 : 100,
        height: pixelRatio <= 2 ? 80 : 100,
        borderRadius: pixelRatio <= 2 ? 40 : 50,
        resizeMode: 'cover',
        backgroundColor: R.colors.primaryWhiteColor,
    },
    cameraViewStyle: {
        position: 'absolute',
        bottom: pixelRatio <= 2 ? -5 : 0,
        right: pixelRatio <= 2 ? -5 : 0,
        width: 30, height: 30,
        borderRadius: 15,
        backgroundColor: '#EFEFEF',
        opacity: 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraImageStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    }
})
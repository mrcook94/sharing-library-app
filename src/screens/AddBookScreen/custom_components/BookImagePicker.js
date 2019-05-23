import React, { Component } from 'react'
import { Text, View, StyleSheet, Keyboard, Image } from 'react-native'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import ImagePicker from 'react-native-image-picker';

import R from 'res/R'

const options = {
    title: 'Chụp ảnh bìa',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class BookImagePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookImageData: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.firstSubContainer}>
                    <Text style={styles.titleTextStyle}> {this.props.title} </Text>
                    <BasicTextButton
                        text='Chọn ảnh'
                        buttonStyle={styles.buttonPickImageStyle}
                        textStyle={styles.textBtnStyle}
                        onPress={this.pickImage}
                    />
                </View>
                {!!this.state.bookImageData && (
                    <Image
                        source={{ uri: this.state.bookImageData.uri }}
                        style={styles.bookImageStyle}
                        resizeMode='contain'
                    />
                )}
            </View>
        )
    }

    pickImage = () => {
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
                    bookImageData: imgData
                });
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    firstSubContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    titleTextStyle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
    },
    buttonPickImageStyle: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 20,
        backgroundColor: R.colors.primaryGrayColor,
    },
    textBtnStyle: {
        color: R.colors.primaryBlackColor,
        fontSize: R.size.textSize.subContent,
    },
    bookImageStyle: {
        width: 200,
        height: 350,
        alignSelf: 'center'
    }
})
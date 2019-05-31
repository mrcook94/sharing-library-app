import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NavigationService from "routers/NavigationService";
import * as screenNames from 'libraries/utils/screenNames'
import { BasicImageButton, BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import { pixelRatio } from 'screens/RootView'
import Icon from 'react-native-vector-icons/FontAwesome5'
import R from "res/R";

const headerHeight = 55;
export const HEADER_HEIGHT = pixelRatio <= 2 ? headerHeight - 8 : headerHeight

export default class DefaultHeader extends PureComponent {

    renderRightButton = () => {
        const { iconScan, onPressScanButton, iconAdd, onPressAddBook, iconCheck, oPressCheckNotification } = this.props
        if (iconScan) {
            return (
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={onPressScanButton}
                >
                    <Icon
                        name={'barcode'}
                        size={R.size.iconSize.iconButton}
                        color={R.colors.primaryWhiteColor}
                    />
                </TouchableOpacity>
            )
        }
        if (iconAdd) {
            return (
                <BasicImageButton
                    onPress={onPressAddBook}
                    imageSource={R.images.icon_app.ic_add}
                    imageStyle={styles.iconStyle}
                />
            )
        }
        if (iconCheck) {
            return (
                <BasicImageButton
                    onPress={oPressCheckNotification}
                    imageSource={R.images.icon_app.ic_check}
                    imageStyle={styles.iconStyle}
                />
            )
        }
        return (
            <View style={styles.buttonStyle} />
        )
    }

    render() {
        const { onPressBackButton, iconBack, headerTitle } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerContent}>
                    {
                        (iconBack) ? (
                            <BasicImageButton
                                onPress={onPressBackButton}
                                imageSource={R.images.icon_app.ic_back}
                                imageStyle={styles.iconStyle}
                            />) : (<View style={styles.buttonStyle} />)
                    }

                    <Text style={styles.titleContentStyle}>{headerTitle}</Text>

                    {this.renderRightButton()}
                </View>
            </View>
        );
    }
}

DefaultHeader.defaultProps = {
    onPressBackButton: () => {
        NavigationService.pop()
    },
    onPressScanButton: () => {
        NavigationService.navigate(screenNames.ISBN_SCANNER)
    },
    onPressAddBook: () => {
        NavigationService.navigate(screenNames.ADD_BOOK_SCREEN)
    }
}



const styles = StyleSheet.create({
    container: {
        height: headerHeight,
        width: "100%",
        backgroundColor: R.colors.primaryColor,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        margin: 5,
        padding: 5,
    },
    titleContentStyle: {
        color: 'white',
        fontSize: R.size.textSize.header,
        fontWeight: '500',
        textAlign: 'center',
    },
    buttonStyle: {
        width: R.size.iconSize.iconButton,
        height: R.size.iconSize.iconButton,
    },
    iconStyle: {
        width: R.size.iconSize.iconButton,
        height: R.size.iconSize.iconButton,
        resizeMode: 'contain',
    },
})
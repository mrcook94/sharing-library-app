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
    render() {
        const { onPressBackButton, iconBack, headerTitle, iconHome, onPressHomeButton } = this.props;
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

                    {
                        (iconHome) ?
                            (<TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={onPressHomeButton}
                            >
                                <Icon
                                    name={'home'}
                                    size={R.size.iconSize.iconButton}
                                    color={R.colors.primaryWhiteColor}
                                />
                            </TouchableOpacity>) : (<View style={styles.buttonStyle} />)

                    }
                </View>
            </View>
        );
    }
}

DefaultHeader.defaultProps = {
    onPressBackButton: () => {
        NavigationService.pop()
    },
    onPressHomeButton: () => {
        NavigationService.reset(screenNames.APP_TAB)
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
    headerTitle: {
        height: '100%',
        backgroundColor: 'red'
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
import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import { height, width, platfromOS } from 'screens/RootView'
import constants from 'libraries/utils/constants'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import apis from 'libraries/networking/book-apis'
import { showLoading, hideLoading } from 'libraries/components/Loading/LoadingModal'
import NavigationService from 'routers/NavigationService'
import { READ_ONLINE_SCREEN } from 'libraries/utils/screenNames'

import R from 'res/R'

export default class PreviewOnlineBookScreen extends Component {
    render() {
        const book_data = this.props.navigation.getParam('book_data', '')
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.book_detail}
                    iconBack={true}
                />
                <ScrollView>
                    <View style={styles.group1ViewStyle}>
                        <FastImage
                            source={book_data.volumeInfo.imageLinks ? { uri: book_data.volumeInfo.imageLinks.thumbnail } : R.images.default_image.img_no_image}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.bookImageStyle}
                        />
                        <Text style={styles.textTitle}>{book_data.volumeInfo.title}</Text>
                        <Text style={styles.contentText}>Đánh giá: {book_data.volumeInfo.averageRating}</Text>
                    </View>
                    <View style={styles.group2ViewStyle}>
                        <Text style={styles.textTitle}>
                            Tác giả: <Text style={styles.contentText}>{book_data.volumeInfo.authors ? book_data.volumeInfo.authors[0] : 'Không rõ'}</Text>
                        </Text>
                        <Text style={styles.textTitle}>Mô tả: </Text>
                        <Text style={styles.contentText}>{book_data.volumeInfo.description}</Text>
                    </View>
                </ScrollView>
                <BasicTextButton
                    buttonStyle={styles.buttonStyle}
                    text='Xem online'
                    textStyle={styles.textButtonStyle}
                    onPress={this.onPressReadOnline}
                />
            </View>
        )
    }

    onPressReadOnline = () => {
        const book_data = this.props.navigation.getParam('book_data', '')
        NavigationService.navigate(READ_ONLINE_SCREEN, { book_url: book_data.accessInfo.webReaderLink })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.primaryGrayColor,
    },
    group1ViewStyle: {
        width: '100%',
        backgroundColor: R.colors.primaryWhiteColor,
        padding: 10,
        alignItems: 'center'
    },
    group2ViewStyle: {
        marginVertical: 10,
        backgroundColor: R.colors.primaryWhiteColor,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    textTitle: {
        fontSize: R.size.textSize.subTitle,
        fontWeight: '500',
        marginTop: 5,
    },
    contentText: {
        fontSize: R.size.textSize.content,
        fontWeight: 'normal'
    },
    marginTop5: { marginTop: 5 },
    bookImageStyle: {
        width: '100%',
        height: height / 3,
    },
    buttonStyle: {
        width,
        paddingVertical: platfromOS == 'android' ? 10 : 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: R.colors.primaryColor,
    },
    textButtonStyle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
        color: R.colors.primaryWhiteColor
    }
})
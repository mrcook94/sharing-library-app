import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import { URL_IMAGE } from 'libraries/utils/imageUrl'
import { height, width } from 'screens/RootView'
import constants from 'libraries/utils/constants'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import Toast from 'react-native-simple-toast'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import { showLoading, hideLoading } from 'libraries/components/Loading/LoadingModal'
import NavigationService from 'routers/NavigationService'
import { QR_CODE_SCREEN } from 'libraries/utils/screenNames'

import R from 'res/R'

export default class DetailBookScreen extends Component {
    render() {
        const book_data = this.props.navigation.getParam('book_data', '')
        const status = (book_data.status === constants.BOOK_STATUS.available) ?
            R.strings.book_status.available : R.strings.book_status.unavailable
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.book_detail}
                    iconBack={true}
                />
                <ScrollView>
                    <View style={styles.group1ViewStyle}>
                        <FastImage
                            source={{ uri: URL_IMAGE.urlBookImage(book_data.front_image) }}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.bookImageStyle}
                        />
                        <Text style={styles.textTitle}>{book_data.name}</Text>
                        <Text style={styles.textTitle}>
                            Trạng thái: <Text style={styles.contentText}>{status}</Text>
                        </Text>
                    </View>
                    <View style={styles.group2ViewStyle}>
                        <Text style={styles.textTitle}>
                            Tác giả: <Text style={styles.contentText}>{book_data.author}</Text>
                        </Text>
                        <Text style={styles.textTitle}>Mô tả: </Text>
                        <Text style={styles.contentText}>{book_data.description}</Text>
                    </View>
                </ScrollView>
                <BasicTextButton
                    buttonStyle={styles.buttonStyle}
                    text='Mượn sách'
                    textStyle={styles.textButtonStyle}
                    onPress={this.onPressBorrowBook}
                />
            </View>
        )
    }

    onPressBorrowBook = () => {
        const book_data = this.props.navigation.getParam('book_data', '')
        if (book_data.status !== constants.BOOK_STATUS.available) {
            Toast.show('Không thể mượn sách này')
            NavigationService.navigate(QR_CODE_SCREEN)
            return;
        }

        showLoading()

        const data = {
            request_type: constants.REQUEST_TYPE.BORROW,
            data: {
                book_id: book_data._id
            }
        }
        apis.post(API_ENDING.REQUEST, data, apis.IS_AUTH.YES)
            .then(res => {
                if (res && res.ok === Status.OK) {
                    hideLoading()
                    NavigationService.navigate(QR_CODE_SCREEN, { data: res.data })
                    Toast.show('Gửi yêu cầu mượn sách thành công.')
                } else {
                    hideLoading()
                    Toast.show('Gửi yêu cầu thất bại.')
                    console.log(res, 'SOMETING WRONG')
                }
            })
            .catch(err => {
                console.log(err, 'ERROR')
                Toast.show('Gửi yêu cầu thất bại.')
            })
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
        height: R.size.buttonSize.basic,
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
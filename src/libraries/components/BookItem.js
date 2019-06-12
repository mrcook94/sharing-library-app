import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationService from 'routers/NavigationService'
import { DETAIL_BOOK_SCREEN } from 'libraries/utils/screenNames'
import { URL_IMAGE } from 'libraries/utils/imageUrl'
import FastImage from 'react-native-fast-image'
import constants from 'libraries/utils/constants'
import R from 'res/R'

const BookItem = (props) => {
    const { item } = props
    return (
        <TouchableOpacity
            style={[styles.bookItemStyle, (item.status !== constants.BOOK_STATUS.available) && styles.borderUnavailableStyle]}
            onPress={onPressDetailBook({ item })}
        >
            <FastImage
                source={{ uri: URL_IMAGE.urlBookImage(item.front_image) }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.bookImageStyle}
            />
            <View style={styles.bookContent}>
                <Text style={styles.bookName}>{item.name}</Text>
                <Text>Tác giả: {item.author}</Text>
                <Text
                    style={styles.bookDescription}
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                >
                    {item.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
onPressDetailBook = ({ item }) => () => {
    NavigationService.navigate(DETAIL_BOOK_SCREEN, { book_data: item })
}

export default BookItem

const styles = StyleSheet.create({
    bookItemStyle: {
        flex: 0.5,
        borderRadius: 5,
        marginHorizontal: 4,
        justifyContent: 'flex-start',
        backgroundColor: R.colors.primaryWhiteColor,
        marginTop: 10,
        elevation: 2,
        paddingTop: 10,
    },
    bookImageStyle: {
        width: '100%',
        height: 150,
    },
    bookContent: {
        padding: 8
    },
    bookName: {
        fontSize: R.size.textSize.subTitle,
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 5,
    },
    bookDescription: {
        fontSize: R.size.textSize.subContent,
        color: R.colors.primaryBlurTextColor,
        marginTop: 5,
    },
    borderUnavailableStyle: {
        borderWidth: 2,
        borderColor: R.colors.red700,
    }
})
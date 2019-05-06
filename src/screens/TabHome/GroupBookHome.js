import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, } from 'react-native'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import FastImage from 'react-native-fast-image'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import NavigationService from 'routers/NavigationService'
import { CATEGORY_SCREEN, BOOK_BY_CATEGORY_SCREEN } from 'libraries/utils/screenNames'
import { URL_IMAGE } from 'libraries/utils/imageUrl'
import ListNoDataComponent from 'libraries/components/ListNoDataComponent'

import R from 'res/R'

class GroupBookHome extends Component {
    state = {
        isLoading: true,
        listHomeBook: []
    }

    renderListHomeBook = ({ item }) => {
        return (
            <TouchableOpacity style={styles.bookItemStyle}>
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
        )
    }

    renderNoData = () => {
        return (
            <ListNoDataComponent
                imageNoData={R.images.default_image.img_none_data}
                textNodata={R.strings.noDataContent.book}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.textTitle}>{R.strings.homeTitle.home_book}</Text>
                </View>
                {this.state.isLoading ? <LoadingComponent /> : (
                    <FlatList
                        data={this.state.listHomeBook}
                        renderItem={this.renderListHomeBook}
                        keyExtractor={this.keyExtractor}
                        numColumns={2}
                        ListEmptyComponent={this.renderNoData}
                        style={styles.listHomeBookStyle}
                        scrollEnabled={false}
                    />
                )}
            </View>
        )
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()

    componentDidMount() {
        apis.fetch(API_ENDING.BOOK, null, apis.IS_AUTH.YES)
            .then(res => {
                if (res && res.ok === Status.OK) {
                    this.setState({
                        listHomeBook: res.data,
                        isLoading: false
                    })
                    console.log(res, 'ACBCBC')
                } else {
                    this.setState({
                        isLoading: false
                    })
                    console.log(res, 'Looix')
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
                console.log(err, 'ERROR')
            })
    }

}

export default GroupBookHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    titleViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
    },
    bookItemStyle: {
        flex: 0.5,
        borderRadius: 5,
        marginHorizontal: 4,
        justifyContent: 'flex-start',
        backgroundColor: R.colors.primaryWhiteColor,
        marginTop: 10,
        elevation: 1,
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
    }
})
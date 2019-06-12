import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import NavigationService from 'routers/NavigationService'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import SearchBar from './custom_components/SearchBar'
import Icon from 'react-native-vector-icons/FontAwesome5'
import apis from 'libraries/networking/book-apis'
import { showLoading, hideLoading } from 'libraries/components/Loading/LoadingModal'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import ListNoDataComponent from 'libraries/components/ListNoDataComponent'
import FastImage from 'react-native-fast-image'
import { PREVIEW_ONLINE_BOOK_SCREEN } from 'libraries/utils/screenNames'

import R from 'res/R'

export default class OnlineBookScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Sách online',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={'globe'}
                size={R.size.iconSize.tabBarIcon}
                color={tintColor}
            />
        )
    };

    state = {
        page: 1,
        maxResults: 20,
        search_key: '',
        listBookData: [],
        isSearch: false,
        totalItem: 0,
    }

    renderListBook = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.bookItemStyle}
                onPress={this.onPressDetailBook({ item })}
            >
                <FastImage
                    source={item.volumeInfo.imageLinks ? { uri: item.volumeInfo.imageLinks.thumbnail } : R.images.default_image.img_no_image}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.bookImageStyle}
                />
                <View style={styles.bookContent}>
                    <Text style={styles.bookName}>{item.volumeInfo.title}</Text>
                    <Text>Tác giả: {item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Không rõ'}</Text>
                    <Text
                        style={styles.bookDescription}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {item.volumeInfo.description}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderNoData = () => {
        if (this.state.isSearch) {
            return (
                <ListNoDataComponent
                    imageNoData={R.images.default_image.img_none_data}
                    textNodata={'Không tìm thấy'}
                />
            )
        }
        return null
    }

    render() {
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.online_book}
                    iconScan={true}
                />
                <SearchBar
                    onChangeText={this.onChangeText('search_key')}
                    onSubmitEditing={this.onSubmitSearch}
                />
                {this.state.isLoading ? <LoadingComponent /> : (
                    <FlatList
                        data={this.state.listBookData}
                        extraData={this.state}
                        renderItem={this.renderListBook}
                        keyExtractor={this.keyExtractor}
                        numColumns={2}
                        ListEmptyComponent={this.renderNoData}
                        style={styles.flatListStyle}
                        refreshing={this.state.isLoading}
                        onEndReachedThreshold={0.2}
                        onEndReached={this.onLoadMoreResult}
                    />
                )}
            </View>
        )
    }

    onChangeText = type => text => {
        this.setState({ [type]: text });
    };

    onSubmitSearch = () => {
        this.setState({
            page: 1,
            listBookData: [],
        }, () => this.onLoadResult())
    }

    onLoadMoreResult = () => {
        const { page, listBookData, maxResults } = this.state
        if (listBookData.length == 0 || page * maxResults > listBookData.length) {
            return
        }
        this.setState(prev => {
            return {
                page: prev.page + 1
            }
        }, () => this.onLoadResult())
    }

    onLoadResult = () => {
        showLoading()
        const { search_key, page, maxResults } = this.state
        const startIndex = (page - 1) * maxResults
        const data = {
            q: search_key,
            startIndex,
            maxResults,
        }

        apis.fetch(apis.ENDING.VOLUMES, data)
            .then(res => {
                hideLoading()
                console.log(res, 'ACACAC')
                this.setState(prev => {
                    return {
                        listBookData: [...prev.listBookData, ...res.items],
                        isSearch: true,
                    }
                }, () => {
                    console.log(this.state.listBookData, 'BVVVVVVV')
                })
            })
            .catch(err => {
                hideLoading()
                console.log(err)
            })
    }

    onPressDetailBook = ({ item }) => () => {
        NavigationService.navigate(PREVIEW_ONLINE_BOOK_SCREEN, { book_data: item })
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.primaryGrayColor,
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
})
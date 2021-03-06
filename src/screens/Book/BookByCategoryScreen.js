import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import ListNoDataComponent from 'libraries/components/ListNoDataComponent'
import BookItem from 'libraries/components/BookItem'
import R from 'res/R'

class BookByCategoryScreen extends Component {
    state = {
        listBookData: [],
        isLoading: true,
        isLoadMore: false,
        page: 1,
        per_page: 6,
    }

    renderListBook = ({ item }) => {
        return (
            <BookItem item={item} />
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

    renderFooterComponent = () => {
        return (
            this.state.isLoadMore && <LoadingComponent />
        )
    }

    render() {
        const category_data = this.props.navigation.getParam('data', '')
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={`Sách ${category_data.category_name.toLowerCase()}`}
                    iconBack={true}
                />
                <View style={{ flex: 1, padding: 5, }}>
                    {this.state.isLoading ? <LoadingComponent /> : (
                        <FlatList
                            data={this.state.listBookData}
                            extraData={this.state}
                            renderItem={this.renderListBook}
                            keyExtractor={this.keyExtractor}
                            numColumns={2}
                            ListEmptyComponent={this.renderNoData}
                            style={styles.flatListStyle}
                            ListFooterComponent={this.renderFooterComponent}
                            refreshing={this.state.isLoading}
                            onRefresh={this.onRefreshListBook}
                            onEndReachedThreshold={0.2}
                            onEndReached={this.onLoadMoreBook}
                        />
                    )}
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.onRefreshListBook()
    }

    onRefreshListBook = () => {
        this.setState({
            page: 1,
            listBookData: [],
            isLoading: true,
        }, () => this.loadListBook())
    }

    onLoadMoreBook = () => {
        const { page, per_page, listBookData } = this.state
        if (listBookData.length !== 0 || page * per_page > listBookData.length) {
            return
        }
        this.setState(prev => {
            return {
                isLoadMore: true,
                page: prev.page + 1
            }
        }, () => this.loadListBook())
    }

    loadListBook = () => {
        const category_data = this.props.navigation.getParam('data', '')
        const params = {
            category_id: category_data._id.toString(),
            page: this.state.page,
            per_page: this.state.per_page,
        }
        apis.fetch(API_ENDING.BOOK, params, apis.IS_AUTH.YES)
            .then(res => {
                if (res && res.ok === Status.OK) {
                    this.setState(prev => {
                        return {
                            listBookData: [...prev.listBookData, ...res.data],
                            isLoadMore: false,
                            isLoading: false,
                        }
                    })
                } else {
                    this.setState({
                        isLoadMore: false,
                        isLoading: false,
                    })
                    console.log(res, 'CANT GET BOOK')
                }
            })
            .catch(err => {
                this.setState({
                    isLoadMore: false,
                    isLoading: false,
                })
                console.log(err, 'ERROR')
            })
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()
}

export default BookByCategoryScreen

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
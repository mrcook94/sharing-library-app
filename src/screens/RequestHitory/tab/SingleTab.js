import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { REQUEST_BORROW_BOOK, REQUEST_CONTRIBUTE_BOOK } from 'libraries/utils/screenNames'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import ListNoDataComponent from 'libraries/components/ListNoDataComponent'
import constants from 'libraries/utils/constants'
import moment from 'moment'

import R from 'res/R'

export default class SingleTab extends Component {
    state = {
        listRequestData: [],
        isLoading: true,
        page: 1,
        per_page: 10,
        isLoadMore: false,
    }

    renderNoData = () => {
        return (
            this.state.isLoading ? null : (
                <ListNoDataComponent
                    imageNoData={R.images.default_image.img_none_data}
                    textNodata={R.strings.noDataContent.request}
                />
            )
        )
    }

    renderFooterComponent = () => {
        return (
            this.state.isLoadMore && <LoadingComponent />
        )
    }

    renderRequestItem = ({ item }) => {
        const ts = item.created_at
        const dateString = moment(ts).format('L');

        console.log(dateString, 'DATEEEEEEEEEEEEEEEE')
        let itemTitle
        switch (item.request_type) {
            case constants.REQUEST_TYPE.BORROW:
                itemTitle = 'Yêu cầu mượn sách'
                break;

            case constants.REQUEST_TYPE.CONTRIBUTE:
                itemTitle = 'Yêu cầu đóng góp sách'
                break;
            default: break;
        }
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <Text>{itemTitle}</Text>
                <Text>Tên sách:</Text>
                <Text>Thời gian gửi:</Text>
                <Text>Trạng thái:</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.listRequestData}
                    renderItem={this.renderRequestItem}
                    keyExtractor={this.keyExtractor}
                    extraData={this.state}
                    ListEmptyComponent={this.renderNoData}
                    style={styles.flatListStyle}
                    ListFooterComponent={this.renderFooterComponent}
                    refreshing={this.state.isLoading}
                    onRefresh={this.onRefreshListRequest}
                    onEndReachedThreshold={0.2}
                    onEndReached={this.onLoadMoreRequest}
                />
            </View>
        )
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()

    componentDidMount() {
        this._willFocus = this.props.navigation.addListener('willFocus', () => {
            if (this.state.listRequestData.length != 0) {
                this.setState({
                    isLoading: false,
                })
                return;
            } else {
                this.onRefreshListRequest()
            }
        })
    }

    componentWillUnmount() {
        this._willFocus.remove();
    }

    onRefreshListRequest = () => {
        this.setState({
            page: 1,
            listRequestData: [],
            isLoading: true,
        }, () => this.loadRequestData())
    }

    onLoadMoreRequest = () => {
        const { page, per_page, listRequestData } = this.state
        if (listRequestData.length !== 0 || page * per_page > listRequestData.length) {
            return
        }
        this.setState(prev => {
            return {
                isLoadMore: true,
                page: prev.page + 1
            }
        }, () => this.loadRequestData())
    }

    loadRequestData = () => {
        let request_type
        let screen_name = this.props.navigation.state.key
        switch (screen_name) {
            case REQUEST_BORROW_BOOK:
                request_type = constants.REQUEST_TYPE.BORROW
                break;

            case REQUEST_CONTRIBUTE_BOOK:
                request_type = constants.REQUEST_TYPE.CONTRIBUTE
                break;

            default: break
        }

        const requestParams = {
            request_type,
            page: this.state.page,
            per_page: this.state.per_page,
        }

        apis.fetch(API_ENDING.REQUEST, requestParams, apis.IS_AUTH.YES)
            .then(res => {
                console.log(res, 'requestDAta')
                if (res && res.ok == Status.OK) {
                    this.setState(prev => {
                        return {
                            isLoading: false,
                            isLoadMore: false,
                            listRequestData: [...prev.listRequestData, ...res.data]
                        }
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        isLoadMore: false,
                    })
                }

            })
            .catch(err => {
                console.log(err, 'ERORR')
                this.setState({
                    isLoading: false,
                    isLoadMore: false,
                })
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.primaryGrayColor,
    },
    flatListStyle: {
        flex: 1,
        marginBottom: 10,
    },
    itemContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: R.colors.primaryWhiteColor,
        marginTop: 10,
    }
})
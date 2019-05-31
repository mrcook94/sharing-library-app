import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { REQUEST_BORROW_BOOK, REQUEST_CONTRIBUTE_BOOK, QR_CODE_SCREEN } from 'libraries/utils/screenNames'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import ListNoDataComponent from 'libraries/components/ListNoDataComponent'
import constants from 'libraries/utils/constants'
import { formatTimestampToDate } from 'libraries/utils/utils'
import NavigationService from 'routers/NavigationService'

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
        let itemTitle
        let requestStatus
        const timestamp = ~~(item.created_at / 1000)
        switch (item.request_type) {
            case constants.REQUEST_TYPE.BORROW:
                itemTitle = 'Yêu cầu mượn sách'
                break;

            case constants.REQUEST_TYPE.CONTRIBUTE:
                itemTitle = 'Yêu cầu đóng góp sách'
                break;
            default: break;
        }

        switch (item.status) {
            case constants.REQUEST_STATUS.PENDING:
                requestStatus = 'Đang chờ xử lý'
                break;

            case constants.REQUEST_STATUS.ACCEPTED:
                requestStatus = 'Đã xác nhận'
                break;

            case constants.REQUEST_STATUS.FINISHED:
                requestStatus = 'Đã hoàn thành'
                break;

            default: break;
        }
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={this.onPressRequestItem({ item })}>
                <Text style={styles.titleTextStyle}>{itemTitle}</Text>
                <Text style={styles.defaultTextStyle}>Tên sách:   <Text style={styles.contentTextStyle}>{item.data.book_name}</Text></Text>
                <Text style={styles.defaultTextStyle}>Thời gian gửi:   <Text style={styles.contentTextStyle}>{formatTimestampToDate(timestamp)}</Text></Text>
                <Text style={styles.defaultTextStyle}>Trạng thái:   <Text style={styles.contentTextStyle}>{requestStatus}</Text> </Text>
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

    onPressRequestItem = ({ item }) => () => {
        const data = { request_id: item._id }
        switch (item.status) {
            case constants.REQUEST_STATUS.PENDING:
                NavigationService.navigate(QR_CODE_SCREEN, { data })
                break;

            default: break;
        }
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
        if (listRequestData.length == 0 || page * per_page > listRequestData.length) {
            return
        }
        this.setState(prev => {
            return {
                page: prev.page + 1,
                isLoadMore: true,
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
    },
    defaultTextStyle: {
        marginTop: 10,
        fontSize: R.size.textSize.subTitle,
        fontWeight: '500',
    },
    contentTextStyle: {
        fontWeight: 'normal',
        fontSize: R.size.textSize.content,
    },
    titleTextStyle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10
    }
})
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList } from 'react-native'
import NotifyTabBarIcon from './custom_components/NotifyTabBarIcon'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import NotificationItem from './custom_components/NotificationItem'
import { loadingNotificationAction, loadMoreNotificationAction } from '../../redux/actions/notifyActions'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import ListNoDataComponent from 'libraries/components/ListNoDataComponent'
import AlertModal from 'libraries/components/Modal/AlertModal'
import { connect } from 'react-redux'

import R from 'res/R'
import apis from 'libraries/networking/apis';
import { API_ENDING } from 'libraries/networking/apiEnding';

class NotificationScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "Thông báo",
        tabBarIcon: ({ tintColor }) => (
            <NotifyTabBarIcon
                iconSource={R.images.icon_app.ic_notification}
                iconStyle={[styles.icon, { tintColor: tintColor }]}
            />
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            per_page: 10,
            isModalVisible: false,
        }
    }

    renderNotifyItem = ({ item }) => {
        return (
            <NotificationItem data={item} />
        )
    }

    renderNoData = () => {
        return (
            <ListNoDataComponent
                imageNoData={R.images.default_image.img_no_notify}
                textNodata={R.strings.noDataContent.notification}
            />
        )
    }

    renderListFooterComponent = () => {
        return (
            (this.props.isLoadMore) && (<LoadingComponent />)
        )
    }

    render() {
        console.log(this.props.listNotification, 'XCDC')
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle='Thông báo'
                    iconCheck={true}
                    oPressCheckNotification={this.onReadAllNotification}
                />
                {this.props.isLoading ? <LoadingComponent /> :
                    <FlatList
                        data={this.props.listNotification}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderNotifyItem}
                        ListEmptyComponent={this.renderNoData}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={this.renderListFooterComponent}
                        extraData={this.props.listNotification}
                        refreshing={this.props.isLoading}
                        onRefresh={this.onRefreshList}
                        onEndReachedThreshold={0.2}
                        onEndReached={this.onLoadmoreList}
                    />
                }
                <AlertModal
                    isModalVisible={this.state.isModalVisible}
                    onCloseModal={this.onCloseModal}
                    onPressActionOk={this.confirmModal}
                    confirmText='Đồng ý'
                    abortText='Huỷ'
                    modalTitle='Xác nhận'
                    modalContents='Đánh dấu đã đọc tất cả thông báo?'
                />
            </View>
        )
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()

    componentDidMount = () => {
        this._willFocus = this.props.navigation.addListener('willFocus', () => {
            this.onRefreshList()
        })
    };

    onReadAllNotification = () => {
        this.setState({ isModalVisible: true })
    }

    onCloseModal = () => {
        this.setState({ isModalVisible: false })
    }

    confirmModal = () => {
        this.setState({ isModalVisible: false }, () => this.readAllNotifications())
    }

    readAllNotifications = () => {
        apis.post(API_ENDING.NOTIFICATIONS, null, apis.IS_AUTH.YES)
            .then(res => {
                this.onRefreshList()
            })
            .catch(err => {
                console.log(err)
            })
    }

    onRefreshList = () => {
        this.setState({
            page: 1,
        }, () => this.loadingNotification())
    }

    onLoadmoreList = () => {
        const { page, per_page } = this.state
        const { listNotification } = this.props
        if (listNotification.length == 0 || (page * per_page) > listNotification.length) {
            return
        }
        this.setState(prev => {
            return {
                page: prev.page + 1,
            }
        }, () => this.loadMoreNotification())
    }

    loadingNotification = () => {
        const data = {
            page: this.state.page,
            per_page: this.state.per_page,
        }
        this.props.loadingNotificationAction(data)
    }

    loadMoreNotification = () => {
        const data = {
            page: this.state.page,
            per_page: this.state.per_page,
        }
        this.props.loadMoreNotificationAction(data)
    }

    componentWillUnmount() {
        this._willFocus.remove();
    }
}

export default connect(state => state.notifyReducer, {
    loadingNotificationAction,
    loadMoreNotificationAction,
})(NotificationScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    icon: {
        width: R.size.iconSize.tabBarIcon,
        height: R.size.iconSize.tabBarIcon,
        resizeMode: "contain",
        marginTop: 4
    },
})

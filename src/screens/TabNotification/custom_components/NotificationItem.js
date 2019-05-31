import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import constants from 'libraries/utils/constants'
import NotifyIcon from './NotifyIcon'
import NavigationService from 'routers/NavigationService'
import apis from 'libraries/networking/apis'
import { Status } from 'libraries/networking/status'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { REQUEST_HISTORY_SCREEN, DETAIL_PROFILE_SCREEN } from 'libraries/utils/screenNames'
import { readNotifyAction } from '../../../redux/actions/notifyActions'
import { formatTimestampToDate } from 'libraries/utils/utils'

import { connect } from 'react-redux'
import R from 'res/R'

class NotificationItem extends Component {
    render() {
        const { data } = this.props
        return (
            <View style={styles.container}>
                <NotifyIcon
                    notify_status={data.status}
                />
                <TouchableOpacity
                    style={styles.groupTextStyle}
                    onPress={() => this.onClickNotify(data)}
                >
                    <Text style={styles.notifyTitleText}>{data.title}</Text>
                    <Text
                        style={styles.notifyContentText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {data.contents}
                    </Text>
                    <Text style={styles.notifyTimeText}>{formatTimestampToDate(data.pushed_at)}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onClickNotify(notify) {
        const data = {
            onesignal_id: notify.onesignal_id,
        }
        if (notify.status === constants.NOTIFY_STATUS.UNREAD) {
            this.props.readNotifyAction(data)
        }
        switch (notify.data.type) {
            case constants.NOTIFY_TYPE.REQUEST:
                NavigationService.navigate(REQUEST_HISTORY_SCREEN, { item: notify.data.data })
                break;
            case constants.NOTIFY_TYPE.REMIND:
                
                break;
            case constants.NOTIFY_TYPE.POINT:
                NavigationService.navigate(DETAIL_PROFILE_SCREEN)
                break;

            case constants.NOTIFY_TYPE.RANK_CHANGE:
                NavigationService.navigate(DETAIL_PROFILE_SCREEN)
                break;

            default: break;
        }
    }
}

export default connect(null, {
    readNotifyAction,
})(NotificationItem)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.primaryBorderColor,
        alignItems: 'flex-start',
    },
    groupTextStyle: {
        marginLeft: 10,
        paddingRight: 30
    },
    notifyTitleText: {
        fontWeight: '500',
        fontSize: R.size.textSize.subTitle,
        marginBottom: 8,
    },
    notifyContentText: {
        fontSize: R.size.textSize.subContent,
        marginBottom: 8,
    },
    notifyTimeText: {
        fontSize: R.size.textSize.smallContent,
        color: R.colors.primaryBlurTextColor,
    }
})
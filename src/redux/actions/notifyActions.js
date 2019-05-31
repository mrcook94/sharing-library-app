import apis from 'libraries/networking/apis'
import { Status } from 'libraries/networking/status'
import { API_ENDING } from 'libraries/networking/apiEnding'
import constants from 'libraries/utils/constants'

export const actionTypes = {
    LOADING_NOTIFICATION: 'LOADING_NOTIFICATION',
    LOAD_NOTIFICATION_SUCCESS: 'LOAD_NOTIFICATION_SUCCESS',
    LOAD_NOTIFICATION_FAILURE: 'LOAD_NOTIFICATION_FAILURE',
    READ_NOTIFICATION: 'READ_NOTIFICATION',
    LOADING_MORE: 'LOADING_MORE',
    LOAD_MORE_SUCCESS: 'LOAD_MORE_SUCCESS',
    LOAD_MORE_FAILURE: 'LOAD_MORE_FAILURE',
    RESET_NOTIFICATION: 'RESET_NOTIFICATION',
}


export function resetNotification() {
    return {
        type: actionTypes.RESET_NOTIFICATION
    }
}

function loading() {
    return {
        type: actionTypes.LOADING_NOTIFICATION
    }
}

function loadSuccess(data, amount_unread) {
    return {
        type: actionTypes.LOAD_NOTIFICATION_SUCCESS,
        amount_unread,
        data,
    }
}

function loadFailure() {
    return {
        type: actionTypes.LOAD_NOTIFICATION_FAILURE
    }
}

export function loadingNotificationAction(data) {
    return (dispatch) => {
        dispatch(loading())
        apis.fetch(API_ENDING.NOTIFICATIONS, data, apis.IS_AUTH.YES)
            .then((res) => {
                if (res && res.ok == Status.OK) {
                    dispatch(loadSuccess(res.data, res.count))
                }
                else {
                    dispatch(loadFailure())
                }
            })
            .catch(() => dispatch(loadFailure()))
    }
}

function loadingMore() {
    return {
        type: actionTypes.LOADING_MORE,
    }
}

function loadMoreSuccess(data) {
    return {
        type: actionTypes.LOAD_MORE_SUCCESS,
        data,
    }
}

function loadMoreFailure() {
    return {
        type: actionTypes.LOAD_MORE_FAILURE,
    }
}

export function loadMoreNotificationAction(data) {
    return (dispatch) => {
        dispatch(loadingMore())
        apis.fetch(API_ENDING.NOTIFICATIONS, data, apis.IS_AUTH.YES)
            .then((res) => {
                if (res && res.ok == Status.OK) {
                    dispatch(loadMoreSuccess(res.data))
                }
                else {
                    dispatch(loadMoreFailure())
                }
            })
            .catch(() => dispatch(loadFailure()))
    }
}


function readNotify() {
    return {
        type: actionTypes.READ_NOTIFICATION
    }
}

export function readNotifyAction(notifyId) {
    return (dispatch) => {
        const url = `${API_ENDING.NOTIFICATIONS}/${notifyId}`
        apis.put(url, null, apis.IS_AUTH.YES)
            .then(res => {
                if (res && res.ok === Status.OK) {
                    dispatch(readNotify())
                }
            })
            .catch(err => {
                console.log(err, 'ERRR')
            })
    }
}
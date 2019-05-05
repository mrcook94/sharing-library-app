import apis from 'libraries/networking/apis'
import { Status } from 'libraries/networking/status'
import { API_ENDING } from 'libraries/networking/apiEnding'
import Toast from 'react-native-simple-toast'

export const actionTypes = {
    LOADING_PROFILE: 'LOADING_PROFILE',
    LOAD_PROFILE_SUCCESS: 'LOAD_PROFILE_SUCCESS',
    LOAD_PROFILE_FAILURE: 'LOAD_PROFILE_FAILURE',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
    UPDATE_PROFILE_FAILURE: 'CHANGE_STAUTUS_FAILURE',
}

function loadingProfile() {
    return {
        type: actionTypes.LOADING_PROFILE,
    }
}

function loadProfileSuccess(data) {
    return {
        type: actionTypes.LOAD_PROFILE_SUCCESS,
        data
    }
}

function loadProfileFailure() {
    return {
        type: actionTypes.LOAD_PROFILE_FAILURE
    }
}

export function loadProfileAction() {
    return (dispatch) => {
        dispatch(loadingProfile())
        apis.fetch(API_ENDING.PROFILE, null, apis.IS_AUTH.YES)
            .then((res) => {
                if (res && res.ok == Status.OK) {
                    dispatch(loadProfileSuccess(res.data))
                }
                else {
                    dispatch(loadProfileFailure())
                }
            })
            .catch(() => dispatch(loadProfileFailure()))
    }
}

function updateProfile() {
    return {
        type: actionTypes.UPDATE_PROFILE
    }
}

function updateProfileSuccess(data) {
    return {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        message: 'Thay đổi thông tin thành công',
        data,
    }
}

function updateProfileFailure(message) {
    return {
        type: actionTypes.UPDATE_PROFILE_FAILURE,
        message
    }
}

export function updateProfileAction(data) {
    return (dispatch) => {
        dispatch(updateProfile())
        const formData = new FormData()
        Object.keys(data).map(value => {
            formData.append(value, data[value])
        })
        apis.putWithFormData(API_ENDING.PROFILE, formData, apis.IS_AUTH.YES)
            .then((res) => {
                if (res && res.ok == Status.OK) {
                    dispatch(updateProfileSuccess(res.data))
                } else {
                    Toast.show(res.message)
                    dispatch(updateProfileFailure())
                }
            })
            .catch((err) => {
                dispatch(updateProfileFailure('Thay đổi thông tin thất bại'))
                console.log(err, 'Có lỗi xảy ra')
            })
    }
}
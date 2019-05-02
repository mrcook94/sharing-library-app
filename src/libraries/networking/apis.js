import axios from 'axios';
import constants from 'libraries/utils/constants';
import R from 'res/R';
import { API_ENDING } from './apiEnding'
import Database from 'libraries/utils/database'

var instance = axios.create({
    baseURL: constants.BASE_URL_API,
    timeout: constants.SERVER_TIMEOUT,
})

const IS_AUTH = {
    YES: true,
    NO: false,
}

function fetch(url, data, isAuth) {
    let headers = null
    if (isAuth) {
        headers = {
            Authorization: Database.getUserToken()
        }
    }
    return instance.get(url, {
        params: {
            ...data
        },
        headers: headers
    }).then(response => {
        return response.data
    }).catch(error => {
        return error;
    })
}

function post(url, data, isAuth) {
    let headers = null
    if (isAuth) {
        headers = {
            Authorization: Database.getUserToken()
        }
    }
    return instance.post(url, data, {
        headers
    }).then(response => {
        return response.data
    }).catch(error => {
        return error;
    })
}

function put(url, data, isAuth) {
    let headers = null
    if (isAuth) {
        headers = {
            Authorization: Database.getUserToken()
        }
    }
    return instance.put(url, { ...data }, {
        headers
    }).then(response => {
        return response.data
    }).catch(error => {
        return error;
    })
}

function postWithFormData(url, data, isAuth) {
    let headers = null
    if (isAuth) {
        headers = {
            Authorization: Database.getUserToken(),
            'Content-Type': 'multipart/form-data',
        }
    }
    return instance.post(url, data, {
        headers
    }).then(response => {
        return response.data
    }).catch(error => {
        return error;
    })
}

export default apis = {
    fetch,
    post,
    postWithFormData,
    IS_AUTH,
    put,
}
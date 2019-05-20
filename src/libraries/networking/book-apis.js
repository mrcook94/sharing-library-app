import axios from 'axios';
import constants from 'libraries/utils/constants';


var instance = axios.create({
    baseURL: constants.GOOGLE_BOOK_API,
    timeout: constants.SERVER_TIMEOUT,
})

var ENDING = {
    VOLUMES: './volumes'
}

function fetch(url, data) {
    let headers = null

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

export default apis = {
    fetch,
    ENDING,
}
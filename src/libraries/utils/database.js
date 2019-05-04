import { AsyncStorage } from 'react-native';

let USER_TOKEN

function save(key, value) {
    AsyncStorage.setItem(key, value);
}

async function get(key) {
    return AsyncStorage.getItem(key);
}

function setUserToken(token) {
    USER_TOKEN = token
}

function getUserToken() {
    return USER_TOKEN
}

function removeItem(key) {
    AsyncStorage.removeItem(key)
}

const KEY = {
    TOKEN: 'key_token',
}

export default {
    save,
    get,
    KEY,
    setUserToken,
    getUserToken,
    removeItem,
}
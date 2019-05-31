import React from 'react';
import { Keyboard } from 'react-native';
import R from 'res/R';
import moment from 'moment';
import 'moment/locale/vi';
import Toast from 'react-native-simple-toast'
import OneSignal from 'react-native-onesignal';

function hideKeyboard() {
    Keyboard.dismiss()
}

function formatStringToDate(strTime, format) {
    if (!strTime) return '';
    return moment(strTime).format(format);
}

export function oneSignalSendTag(user_id) {
    OneSignal.sendTag('user_id', user_id);
}

export function formatTimestampToDate(ts) {
    const current_time = moment(new Date()).unix()
    const differ_time = current_time - ts
    let converted_time

    if (differ_time < 60) {
        converted_time = `${differ_time} giây trước`
    } else if (differ_time >= 60 && differ_time < 3600) {
        converted_time = `${~~(differ_time / 60)} phút trước`
    } else if (differ_time >= 3600 && differ_time < 86400) {
        converted_time = `${~~(differ_time / 3600)} giờ trước`
    } else if (differ_time >= 86400) {
        converted_time = `${~~(differ_time / 86400)} ngày trước`
    }

    return converted_time
}

function regexName(name) {
    let message
    let validated = true
    if (name.length < 2) {
        message = "Tên không được ít hơn 2 ký tự";
        validated = false
    } else {
        let regex = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
        if (!regex.test(name)) {
            message = "Tên không được chứa ký tự đặc biệt";
            validated = false
        }
    }
    return {
        message, validated
    }
}

function regexPhone(phone) {
    let message
    let validated = true
    if (phone.charAt(0) !== '0' || phone.length != 10) {
        validated = false
        message = "Số điện thoại chưa đúng";
    } else {
        let regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        if (!regex.test(phone)) {
            message = "Số điện thoại chỉ được chứa số";
            validated = false
        }
    }
    return {
        message, validated
    }
}

function regexPassword(password) {
    let message
    let validated = true
    if (password.length < 6) {
        validated = false,
            message = 'Mật khẩu không được ít hơn 6 ký tự'
    }
    return {
        validated, message
    }
}

export function formatPhoneNumber(phone) {
    let formatedPhone = '+84'
    let subPhone = phone.substring(1, phone.length)
    formatedPhone += subPhone
    return formatedPhone
}

export function displayMessage(message) {
    const msg_type = typeof message
    if (msg_type === 'string') {
        Toast.show(message)
    }
    else {
        if (message.phone) {
            Toast.show('Số điện thoại đã được sử dụng')
        }
    }
}

export function formatMoney(amount) {
    try {
        let thousands = "."
        const negativeSign = amount < 0 ? "-" : "";
        let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
        let j = (i.length >

            3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + " đ";
    } catch (e) {
        console.log(e)
    }
};

function regexEmail(email) {
    if (email.length <= 0) {
        return "Email không được để trống";
    } else {
        let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regex.test(email.toLowerCase())) {
            return "Email chưa đúng";
        }
    }
    return true;
}


export function formateDateWithMoment(date) {
    let result = moment(date).startOf('hour').fromNow();
    return result.charAt(0).toUpperCase() + result.slice(1)
}

export function getCurrentDate() {
    const DATE_FORMAT = 'YYYY-MM-DD'
    let today = moment(new Date()).format(DATE_FORMAT);
    return today;
}

export function FormatDateTime(expirationDate) {
    let newDate = '';
    var oneDay = 24 * 60 * 60 * 1000;
    let dateFr = Date.parse(moment(expirationDate).format()) - Date.parse(new Date());
    if (dateFr >= -oneDay) {
        if (dateFr / 60 >= -oneDay / 24 / 60) {
            if (dateFr / 60 >= -oneDay / 24 / 60 / 60) {
                newDate = `${parseInt((Date.parse(Date()) - Date.parse(moment(expirationDate).format())) / 1000)} giây trước`;
            } else {
                newDate = `${parseInt((Date.parse(Date()) - Date.parse(moment(expirationDate).format())) / (60 * 1000))} phút trước`;
            }
        } else {
            newDate = `${parseInt((Date.parse(Date()) - Date.parse(moment(expirationDate).format())) / (60 * 60 * 1000))} giờ trước`;
        }
    } else if (dateFr <= -oneDay && dateFr >= (-oneDay * 30)) {
        newDate = `${parseInt((Date.parse(moment(expirationDate).format()) - Date.parse(Date())) / (-oneDay))} ngày trước`;
    } else {
        newDate = `Ngày tạo: ${moment(expirationDate).format('DD.MM.YYYY')}`
    }
    return newDate;
}

//   format DD/MM/YYYY
export function convertDateFormat(date) {
    if (date) {
        var datePart = date.match(/\d+/g),
            year = datePart[0],
            month = datePart[1],
            day = datePart[2];
        return (day + '/' + month + '/' + year);
    }
}

export default {
    hideKeyboard,
    Regex: {
        regexName,
        regexPhone,
        regexEmail,
        regexPassword,
    },
    formatStringToDate,
}




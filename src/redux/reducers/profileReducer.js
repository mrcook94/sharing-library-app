import { actionTypes } from '../actions/profileActions'
import Toast from 'react-native-simple-toast'
import R from 'res/R'

const defaultListMenu = [
    {
        id: R.strings.profileItemID.detailProfile,
        title: 'Thông tin cá nhân',
        image: R.images.profile.ic_profile,
    },
    {
        id: R.strings.profileItemID.requestHistory,
        title: 'Lịch sử yêu cầu',
        image: R.images.profile.ic_history_request,
    },
    {
        id: R.strings.profileItemID.borrowingBooks,
        title: 'Sách đang mượn',
        image: R.images.profile.ic_book,
    },
    {
        id: R.strings.profileItemID.memberRanking,
        title: 'Xếp hạng thành viên',
        image: R.images.profile.ic_ranking,
    },
    {
        id: R.strings.profileItemID.changePassword,
        title: 'Đổi mật khẩu',
        image: R.images.profile.ic_change_pw,
    },
    {
        id: R.strings.profileItemID.logout,
        title: 'Đăng xuất',
        image: R.images.profile.ic_logout,
    },
]

const initState = {
    userProfile: {},
    isLoadingProfile: false,
    isProfileUpdating: false,
    userListMenu: defaultListMenu,
    appConfig: null,
}

function profileReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOADING_PROFILE:
            return {
                ...state,
                isLoadingProfile: true,
            }
        case actionTypes.LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                userProfile: action.data,
                isLoadingProfile: false,
            }
        case actionTypes.LOAD_PROFILE_FAILURE:
            return {
                ...state,
                isLoadingProfile: false,
            }
        case actionTypes.UPDATE_PROFILE:
            return {
                ...state,
                isProfileUpdating: true
            }
        case actionTypes.UPDATE_PROFILE_SUCCESS:
            Toast.show(action.message)
            return {
                ...state,
                userProfile: action.data,
                isProfileUpdating: false
            }
        case actionTypes.UPDATE_PROFILE_FAILURE:
            (!!action.message) && Toast.show(action.message)
            return {
                ...state,
                isProfileUpdating: false,
            }
        default: return state
    }
}

export default profileReducer
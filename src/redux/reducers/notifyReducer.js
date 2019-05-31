import { actionTypes } from '../actions/notifyActions'

const initState = {
    totalUnreadNotify: 0,
    isLoading: false,
    isLoadMore: false,
    listNotification: [],
}

function notifyReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOADING_NOTIFICATION:
            return {
                ...state,
                isLoading: true
            }

        case actionTypes.LOAD_NOTIFICATION_SUCCESS:
            state.totalUnreadNotify = action.amount_unread
            return {
                ...state,
                isLoading: false,
                listNotification: action.data,
            }

        case actionTypes.LOAD_NOTIFICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
            }

        case actionTypes.LOADING_MORE:
            return {
                ...state,
                isLoadMore: true,
            }

        case actionTypes.LOAD_MORE_SUCCESS:
            return {
                ...state,
                isLoadMore: false,
                listNotification: [...state.listNotification, ...action.data],
            }

        case actionTypes.LOAD_MORE_FAILURE:
            return {
                ...state,
                isLoadMore: false,
            }
            
        case actionTypes.READ_NOTIFICATION:
            return {
                ...state,
                totalUnreadNotify: state.totalUnreadNotify - 1,
            }
        case actionTypes.RESET_NOTIFICATION:
        
            return {
                ...state,
                ...initState
            }
        default:
            return {
                ...state
            }
    }
}

export default notifyReducer
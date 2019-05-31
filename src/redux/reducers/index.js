import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import notifyReducer from './notifyReducer'

const rootReducers = combineReducers({
    profileReducer,
    notifyReducer,
})

export default rootReducers;
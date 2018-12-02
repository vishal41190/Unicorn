import { combineReducers } from 'redux'
import { REGISTRATION_SUCCESS, REGISTRATION_FAIL,LOGIN_SUCCESS,LOGIN_FAIL } from '../constants/ActionTypes'

const INITIAL_STATE = {
    error: undefined
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
            return Object.assign({}, state, {
                token: action.token
            });
        case REGISTRATION_FAIL:
            return Object.assign({}, state, {
                error: "Error Registering",
                errorMessage:action.message
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                token: action.token
            });
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                error: "Error Login",
                errorMessage:action.message
            });
        default:
            return state;
    }
}

export default combineReducers({
    user: userReducer
})
import {ACTIONS} from '../actions';

const defaultState = {
    viewChangeCounter: 0,
};

export default (state = defaultState, action) => {
    let message = '';
    switch (action.type) {
        case ACTIONS.COMMON.APP_LOAD:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                token: action.oauthToken ? action.oauthToken.access_token : null,
                appLoad: true,
                isNeedRefreshToken: false,
                currentUser: action.payload && action.payload.data
            };
        case ACTIONS.COMMON.REDIRECT:
            return {...state, redirectTo: null};
        case ACTIONS.COMMON.REDIRECT_TO:
            return {...state, redirectTo: action.to, currentPath: action.currentPath};
        case ACTIONS.COMMON.ERROR:
            return {...state, error: null};
        case ACTIONS.COMMON.CLEAR_MESSAGE:
            return {...state, message: null};
        case ACTIONS.COMMON.MESSAGE:
            return {...state, message: action.message};
        case ACTIONS.AUTH.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                currentUser: null,
                token: null,
            };
        case ACTIONS.AUTH.LOGIN:
            return {
                ...state,
                redirectTo: action.oauthToken.current_path,
                isAuthenticated: true,
                token: action.oauthToken.access_token,
                logout: false,
                refreshToken: false
            };
        case ACTIONS.AUTH.REFRESH_TOKEN:
            return {
                ...state,
                error: action.payload && action.payload.error ? action.payload.error : null,
                token: action.payload && action.payload.data && action.payload.data.access_token,
                isNeedRefreshToken: true,
                refreshToken: !(action.payload && action.payload.data)
            };
        case ACTIONS.AUTH.GET_PROFILE:
            return {...state, currentUser: action.payload && action.payload.data, appLoad: true};
        case ACTIONS.HOME.DO_SOMETHING:
            if (action.error) {
                return {...state, error: action.payload ? action.payload.error : {message: 'Error'}};
            }
            break;
        case ACTIONS.COMMON.ASYNC_START:
            switch (action.subtype) {
                case ACTIONS.AUTH.LOGOUT:
                    return {...state, logout: true};
                case ACTIONS.AUTH.REFRESH_TOKEN:
                    return {...state, refreshToken: true};
            }
            break;
        case ACTIONS.AUTH.UNLOADED_LOGIN:
        case ACTIONS.HOME.UNLOAD_HOME:
            return {...state, viewChangeCounter: state.viewChangeCounter + 1};
        default:
            return state;
    }
    return state;
};
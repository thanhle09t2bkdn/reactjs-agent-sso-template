import {AUTH} from '../actions/auth';

export default (state = {}, action) => {
    switch (action.type) {
        case AUTH.REFRESH_TOKEN:
            return { ...state, inProgressRefresh: false};
        case AUTH.GET_PROFILE:
            return { ...state, inProgress: false};
        case AUTH.ASYNC_START:
            switch (action.subtype) {
                case AUTH.REFRESH_TOKEN:
                    return { ...state, inProgressRefresh: true };
                case AUTH.GET_PROFILE:
                    return { ...state, inProgress: true };
            }
            return state;
        default:
            return state;
    }

    return state;
};
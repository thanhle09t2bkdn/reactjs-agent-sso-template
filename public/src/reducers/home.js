import {HOME} from '../actions/home';

export default (state = {}, action) => {
    switch (action.type) {
        case HOME.DO_SOMETHING:
            return {...state, inProgress: false};
        case HOME.ASYNC_START:
            switch (action.subtype) {
                case HOME.DO_SOMETHING:
                    return {...state, inProgress: true};
            }
            return state;
        default:
            return state;
    }

    return state;
};
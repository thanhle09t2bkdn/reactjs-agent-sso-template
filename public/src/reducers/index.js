import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import common from './common';
import auth from './auth';
import home from './home';

const rootReducer = combineReducers({
    form: formReducer,
    common: common,
    auth: auth,
    home: home,
});

export default rootReducer;
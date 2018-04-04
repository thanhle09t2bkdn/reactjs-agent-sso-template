import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {promiseMiddleware, localStorageMiddleware} from './middleware';
import reducer from './reducers';

import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));

import agent from './agent';
import {getOauthToken, removeAuthenticated, authenticated, checkAuthenticated} from './modules/Auth';
import {COMMON} from './actions/common';
import {AUTH} from './actions/auth';
import fileSaver from 'file-saver';

const promiseMiddleware = store => next => action => {
    const promise = action.payload;
    if (isPromise(promise)) {
        const auth = checkAuthenticated();
        const stateCommon = store.getState().common;

        if (!auth.oauthToken && !stateCommon.logout) {
            store.dispatch({type: AUTH.LOGOUT});
            return;
        } else {
            if (!auth.isAuthenticated && action.type !== AUTH.REFRESH_TOKEN) {
                promise.abort();
                if (!stateCommon.refreshToken) {
                    store.dispatch({
                        type: COMMON.MESSAGE,
                        message: 'Your session is resetting. Please try again.'
                    });
                    store.dispatch({
                        type: AUTH.REFRESH_TOKEN,
                        payload: agent.Auth.refreshToken(auth.oauthToken.refresh_token)
                    });
                }
                return;
            }
        }

        store.dispatch({ type: COMMON.ASYNC_START, subtype: action.type });

        const currentView = stateCommon.viewChangeCounter;
        const skipTracking = action.skipTracking;
        promise.then(
            res => {
                const currentStateCommon = store.getState().common;
                if (!skipTracking && currentStateCommon.viewChangeCounter !== currentView) {
                    return
                }

                action.payload = res.body;
                store.dispatch({type: COMMON.ASYNC_END, promise: action.payload});
                if (res.body && res.body.constructor === ArrayBuffer) {
                    const blob = new Blob([res.body]);
                    fileSaver.saveAs(blob, action.fileName);
                    action.payload.data = true;
                }
                store.dispatch(action);
            },
            error => {
                const currentStateCommon = store.getState().common;
                if (error.status === 401) {
                    if (!stateCommon.refreshToken) {
                        store.dispatch({
                            type: COMMON.MESSAGE,
                            message: 'Your session is resetting. Please try again.'
                        });
                        store.dispatch({
                            type: AUTH.REFRESH_TOKEN,
                            payload: agent.Auth.refreshToken(auth.oauthToken.refresh_token)
                        });
                    }
                } else if (action.type === AUTH.REFRESH_TOKEN && !stateCommon.logout) {
                    store.dispatch({
                        type: COMMON.MESSAGE,
                        message: 'Your session has expired.'
                    });
                    store.dispatch({type: AUTH.LOGOUT});
                    if (action.type !== COMMON.APP_LOAD) {
                        return;
                    }
                }

                if (!skipTracking && currentStateCommon.viewChangeCounter !== currentView) {
                    return;
                }

                action.error = true;
                action.payload = error.response ? error.response.body : error.response;
                if (!action.skipTracking) {
                    store.dispatch({ type: COMMON.ASYNC_END, promise: action.payload });
                }
                store.dispatch(action);
            }
        );

        return;
    }

    next(action);
};

const localStorageMiddleware = store => next => action => {
    switch (action.type) {
        case AUTH.LOGOUT:
            removeAuthenticated();
            agent.setToken(null);
            break;

        case AUTH.REFRESH_TOKEN:
            if (action.payload && action.payload.data) {
                const oauthToken = getOauthToken();
                const oauthTokenNew = {...oauthToken, ...action.payload.data};

                agent.setToken(oauthTokenNew.access_token);
                authenticated(oauthTokenNew);
            }
            break;
        case AUTH.LOGIN:
            if (action.oauthToken && action.oauthToken.access_token) {
                authenticated(action.oauthToken);
            }
            break;
    }
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export { promiseMiddleware, localStorageMiddleware }

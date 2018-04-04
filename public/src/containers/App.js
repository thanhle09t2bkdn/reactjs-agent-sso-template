import AppPage from '../pages/App';
import {connect} from 'react-redux';
import agent from '../agent';
import {AUTH} from '../actions/auth';
import {COMMON} from '../actions/common';

const mapStateToProps = (state) => {
    return {
        appLoaded: state.common.appLoaded,
        isAuthenticated: state.common.isAuthenticated,
        isNeedRefreshToken: state.common.isNeedRefreshToken,
        inProgress: state.auth.inProgress,
        inProgressRefresh: state.auth.inProgressRefresh,
        redirectTo: state.common.redirectTo,
        error: state.common.error,
        message: state.common.message,
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        onLoad: (oauthToken, isAuthenticated) => {
            const payload = oauthToken && agent.Auth.getProfile();
            return dispatch({type: COMMON.APP_LOAD, payload, oauthToken, isAuthenticated, skipTracking: true});
        },
        onRedirect: () => {
            return dispatch({type: COMMON.REDIRECT});
        },
        onCloseError: () => {
            return dispatch({type: COMMON.ERROR});
        },
        onClearMessage: () => {
            return dispatch({type: COMMON.CLEAR_MESSAGE});
        },
        onUseRefreshToken: (refreshToken) => {
            return dispatch({type: AUTH.REFRESH_TOKEN, payload: agent.Auth.refreshToken(refreshToken)});
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
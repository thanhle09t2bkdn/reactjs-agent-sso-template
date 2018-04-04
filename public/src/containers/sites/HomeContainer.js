import HomePage from '../../pages/sites/HomePage';
import {connect} from 'react-redux';
import agent from '../../agent';
import {COMMON} from '../../actions/common';
import {AUTH} from '../../actions/auth';

const mapDispatchToProps = (dispatch) => {
    return {
        onShowMessage: (message) => {
            return dispatch({type: COMMON.MESSAGE, message});
        },
        onLogout: () => {
            return dispatch({type: AUTH.LOGOUT});
        },
        onUseRefreshToken: (refreshToken) => {
            return dispatch({type: AUTH.REFRESH_TOKEN, payload: agent.Auth.refreshToken(refreshToken)});
        },
    };
};

function mapStateToProps(state, ownProps) {
    return {
        ...state.home,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
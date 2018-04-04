import HeaderPage from '../../pages/layouts/HeaderPage';
import {connect} from 'react-redux';
import {AUTH} from '../../actions/auth';
import {COMMON} from '../../actions/common';

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            return dispatch({type: AUTH.LOGOUT});
        },
        onRedirectTo: (to) => {
            return dispatch({type: COMMON.REDIRECT_TO, to: to});
        },
    };
};

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.common.isAuthenticated,
        currentUser: state.common.currentUser,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage);

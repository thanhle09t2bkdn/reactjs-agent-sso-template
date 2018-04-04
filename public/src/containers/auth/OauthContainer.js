import OauthPage from '../../pages/auth/OauthPage';
import {connect} from 'react-redux';
import {AUTH} from '../../actions/auth';
import {COMMON} from '../../actions/common';

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (oauthToken) => {
            return dispatch({type: AUTH.LOGIN, oauthToken: oauthToken});
        },
        onRedirectTo: (to) => {
            return dispatch({type: COMMON.REDIRECT_TO, to: to});
        },
    };
};

function mapStateToProps(state, ownProps) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OauthPage);
import React, {Component} from 'react';
import {decodeBase64StringToJSON} from '../../helpers';
import {PATH_URL} from '../../constants';
import {withRouter} from 'react-router-dom';
import LoadingPage from '../../pages/sites/LoadingPage';

class OauthPage extends Component {

    constructor(props) {
        super(props);
        const oauthToken = decodeBase64StringToJSON(props.match.params.oauthToken);
        if (oauthToken && oauthToken.access_token) {
            props.onLogin(oauthToken);
        } else {
            props.onRedirectTo(PATH_URL.NOT_FOUND.PATH);
        }
    }

    render() {
        return <LoadingPage />;
    }
}

export default withRouter(OauthPage);

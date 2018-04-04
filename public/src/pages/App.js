import React, {Component, Fragment} from 'react';
import {Switch, withRouter, Route} from 'react-router-dom';
import {PATH_URL} from '../constants';
import {checkAuthenticated} from '../modules/Auth';
import {AuthenticatedRoute, PublicRoute} from '../components/route';
import {SnackBarCenter} from '../components/snack-bar';
import Header from '../containers/layouts/HeaderContainer';
import NotFoundPage from '../pages/sites/NotFoundPage';
import agent from '../agent';
import HomeContainer from '../containers/sites/HomeContainer';
import OauthContainer from '../containers/auth/OauthContainer';
import '../../css/style.css';

class AppPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDisplay: true,
            refresh: true
        };
    }

    componentDidMount() {
        const auth = checkAuthenticated();
        if (auth.oauthToken) {
            agent.setToken(auth.oauthToken.access_token);
        }
        this.props.onLoad(auth.oauthToken, auth.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
        if (!nextProps.inProgressRefresh && nextProps.isNeedRefreshToken && this.state.refresh) {
            this.setState({
                refresh: false,
            }, () => {
                const auth = checkAuthenticated();
                this.props.onLoad(auth.oauthToken, auth.isAuthenticated);
            });
        }
        if (!nextProps.inProgressRefresh && !nextProps.isNeedRefreshToken && !this.state.refresh) {
            this.setState({
                refresh: true,
            });
        }
    }

    onRequestCloseSnackBar = (error) => {
        error ? this.props.onCloseError() : this.props.onClearMessage();
    };

    render() {
        const {isAuthenticated, error, message} = this.props;

        const toastMessageSnackBar = error && error.message ? error.message : message || '';

        return (
            <Fragment>
                {isAuthenticated && this.state.menuDisplay && <Header />}
                <Switch>
                    {/*Login*/}
                    <PublicRoute
                        exact name={PATH_URL.AUTH.OAUTH.TITLE}
                        path={PATH_URL.AUTH.OAUTH.PATH}
                        component={OauthContainer}
                    />

                    {/*Home*/}
                    <AuthenticatedRoute
                        exact name={PATH_URL.HOME.INDEX.TITLE}
                        path={PATH_URL.HOME.INDEX.PATH}
                        component={HomeContainer}
                    />

                    {/*Other*/}
                    <Route
                        name={PATH_URL.NOT_FOUND.TITLE}
                        path={PATH_URL.NOT_FOUND.PATH}
                        component={NotFoundPage}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
                <SnackBarCenter
                    message={toastMessageSnackBar}
                    onRequestClose={() => this.onRequestCloseSnackBar(error)}
                />
            </Fragment>
        );
    }
}

export default withRouter(AppPage);
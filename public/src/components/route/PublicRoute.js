import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {PATH_URL} from '../../constants';
import LoadingPage from '../../pages/sites/LoadingPage';
import {connect} from 'react-redux';
import {COMMON} from '../../actions/common';
import {checkAuthenticated} from '../../modules/Auth';

const mapDispatchToProps = (dispatch) => {
    return {
        onRedirectTo: (to) => {
            return dispatch({type: COMMON.REDIRECT_TO, to: to});
        },
    };
};

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.common.isAuthenticated,
        appLoad: state.common.appLoad,
    };
}

const propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
};

const defaultProps = {
    path: '',
    component: function () {
        return 'Not found';
    }
};

class PublicRoute extends Component {

    state = {isAuthenticated: false};

    componentWillMount() {
        const auth = checkAuthenticated();
        if (auth.oauthToken) {
            this.setState({
                isAuthenticated: true,
            });
            this.props.onRedirectTo(PATH_URL.HOME.INDEX.PATH);
        }
    }

    render() {
        const {component, ...rest} = this.props;
        const {isAuthenticated} = this.state;
        document.title = rest.name;

        return (
            isAuthenticated ? <LoadingPage /> :
                <Route
                    {...rest}
                    render={routeProps => {
                        const finalProps = {
                            routeProps,
                            ...rest
                        };
                        return React.createElement(component, finalProps)
                    }}
                />
        );
    }
}

PublicRoute.propTypes = propTypes;
PublicRoute.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
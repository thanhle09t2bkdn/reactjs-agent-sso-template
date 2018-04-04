import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {COMMON} from '../../actions/common';
import agent from '../../agent';
import LoadingPage from '../../pages/sites/LoadingPage';

const mapDispatchToProps = (dispatch) => {
    return {
        onRedirectTo: (to, currentPath) => {
            return dispatch({type: COMMON.REDIRECT_TO, to, currentPath});
        },
        onGetSSOUri: (currentPath) => {
            return agent.Auth.getSSOUri(currentPath);
        },
    };
};

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.common.isAuthenticated,
        appLoad: state.common.appLoad
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

class AuthenticatedRoute extends Component {

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isAuthenticated && nextProps.appLoad) {
            window.location.href = this.props.onGetSSOUri(nextProps.currentPath);
        }
    }

    render() {
        const {component: Component, isAuthenticated, ...rest} = this.props;
        document.title = rest.name;

        if (isAuthenticated) {
            return (
                <Route {...rest} render={
                    (props) => (
                        <Component {...props} />
                    )}
                />
            );
        }
        return <LoadingPage />;
    }
}

AuthenticatedRoute.propTypes = propTypes;
AuthenticatedRoute.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);

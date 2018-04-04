import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class HomePage extends Component {

    render() {

        return (
            <div className="page home-page">
                Home
            </div>
        );
    }
}

export default reduxForm({
    form: 'HomePage',
})(HomePage);
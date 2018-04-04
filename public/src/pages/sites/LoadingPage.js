import React, {Component} from 'react';
import {LoadingComponent} from '../../components/loading';

class LoadingPage extends Component {
    render() {
        return (
            <div className="page-content text-center">
                <LoadingComponent />
                <h4>Please wait a moment</h4>
            </div>
        );
    }
}

export default LoadingPage;
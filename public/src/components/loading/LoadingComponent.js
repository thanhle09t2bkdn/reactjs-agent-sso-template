import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {COLOR} from '../../constants';

const style = {
    marginTop: 15,
    align: 'center'
};

function LoadingComponent() {
    return (
        <CircularProgress size={40} thickness={3} color={COLOR.DEFAULT_COLOR} style={style} />
    );
}

export default LoadingComponent;

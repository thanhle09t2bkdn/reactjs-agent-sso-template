import React from 'react';
import SnackBar from 'material-ui/Snackbar';

const style = {
    main: {
        textAlign: 'center'
    },
};

function SnackBarCenter(props) {
    return (
        <SnackBar
            open={props.message !== ''}
            autoHideDuration={3000}
            contentStyle={style.main}
            {...props}
        />
    );
}

export default SnackBarCenter;
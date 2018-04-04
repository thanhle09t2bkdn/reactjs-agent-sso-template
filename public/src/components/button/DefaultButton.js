import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {COLOR} from '../../constants';
const styleButton = {
    label: {
        textTransform: 'capitalize'
    },
    main: {
        marginRight: 16
    }
};

function DefaultButton(props) {
    return (
        <RaisedButton
            labelColor={COLOR.DEFAULT_TEXT_COLOR}
            backgroundColor={COLOR.DEFAULT_COLOR}
            labelStyle={styleButton.label}
            style={styleButton.main}
            {...props}
        />
    );
}

export default DefaultButton;
import React, {Component} from 'react';
import {BottomNavigation} from 'material-ui/BottomNavigation';


const style = {
    footer: {
        position: "fixed",
        bottom: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #cccccc',
        width: '100%',
        padding: 0,
        zIndex: 9000
    },

    credit: {
        padding: '7px 20px',
        fontSize: 14,
    }
};

class FooterPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="footer" style={style.footer}>
                <BottomNavigation>
                    <p style={style.credit}>Copy right</p>
                </BottomNavigation>
            </div>
        );
    }
}

export default FooterPage;
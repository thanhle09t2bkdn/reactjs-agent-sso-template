import React, {Component} from 'react';
import {COLOR, STYLE} from '../../constants';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {withRouter} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import MenuPage from './MenuPage';
import Logout from 'material-ui/svg-icons/action/power-settings-new';

const style = {
    appBar: {
        backgroundColor: COLOR.DEFAULT_COLOR,
        paddingTop: 0,
        marginTop: 0,
        top: 0,
        left: 0
    },
    drawer: {
        backgroundColor: COLOR.DEFAULT_LEFTBAR_BACKGROUND,
    },
    labelButton: {
        textTransform: 'capitalize'
    },
    appName: {
        textAlign: 'center',
        fontSize: 22
    }
};

class HeaderPage extends Component {

    state = {
        open: false
    };

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    onClickLogout = () => {
        this.props.onLogout();
    };

    render() {

        const {currentUser} = this.props;
        const title = currentUser && `${currentUser.displayName || ''} (${currentUser.role})`;
        const appName = "Sompo maintenance";

        return (
            <div id="header">
                <AppBar
                    title={title}
                    onLeftIconButtonClick={this.handleToggle}
                    iconElementRight={
                        <FlatButton
                            label="Log Out"
                            labelPosition="before"
                            primary={true}
                            icon={<Logout />}
                            onClick={this.onClickLogout}
                            labelStyle={style.labelButton}
                        />
                    }
                    style={style.appBar}
                />

                <Drawer
                    open={this.state.open}
                    width={STYLE.WIDTH_MENU_BAR}
                    containerStyle={style.drawer}
                    docked={false}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar
                        style={style.appBar}
                        title={<div style={style.appName}>{appName}</div>}
                        showMenuIconButton={false}
                    />
                    <MenuPage onRedirectTo={this.props.onRedirectTo} handleClose={this.handleClose} />
                </Drawer>
            </div>
        );
    }
}

HeaderPage.propTypes = {
};

export default withRouter(HeaderPage);
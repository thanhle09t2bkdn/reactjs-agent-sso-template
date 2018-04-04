import React, {Component} from 'react';
import {COLOR, PATH_URL, STYLE} from '../../constants';
import Home from 'material-ui/svg-icons/action/home';
import {List, ListItem} from 'material-ui/List';

const style = {
    selectedMenuItem: {
        backgroundColor: COLOR.DEFAULT_COLOR,
        color: COLOR.DEFAULT_TEXT_COLOR
    },
    menuItem: {
        backgroundColor: COLOR.DEFAULT_LEFTBAR_BACKGROUND,
    },
};

const listItems = [
    {
        leftIcon: <Home />,
        primaryText: 'Home',
        value: PATH_URL.HOME.INDEX.PATH,
        nestedItems: []
    },
];

class MenuPage extends Component {

    constructor(props) {
        super(props);
        let currentPath = '/' + window.location.pathname.split('/')[1];

        this.state = {
            selectedItem: currentPath
        }
    }

    handleChangeMenuItem = (value) => {
        if (value) {
            this.props.handleClose();
            this.setState({selectedItem: value});
            this.props.onRedirectTo(value);
        }
    };

    render() {
        return (
            <List
                width={STYLE.WIDTH_MENU_BAR}
            >
                {
                    listItems.map((item, index) => {
                        let nestedItems = [];
                        if (item.nestedItems && item.nestedItems.length !== 0) {
                            nestedItems = item.nestedItems.map((nestedItem, nestedIndex) => {
                                const styleListItem = this.state.selectedItem === nestedItem.value ? style.selectedMenuItem : style.menuItem;
                                return (
                                    <ListItem
                                        key={nestedIndex}
                                        primaryText={nestedItem.primaryText}
                                        leftIcon={nestedItem.leftIcon}
                                        value={nestedItem.value}
                                        onClick={() => this.handleChangeMenuItem(nestedItem.value)}
                                        style={styleListItem}
                                    />
                                );
                            });
                        }
                        const styleListItem = this.state.selectedItem === item.value ? style.selectedMenuItem : style.menuItem;
                        return (
                            <ListItem
                                key={index}
                                initiallyOpen={true}
                                primaryTogglesNestedList={true}
                                primaryText={item.primaryText}
                                leftIcon={item.leftIcon}
                                value={item.value}
                                nestedItems={nestedItems}
                                onClick={() => this.handleChangeMenuItem(item.value)}
                                style={styleListItem}
                            />
                        );
                    })
                }
            </List>
        );
    }
}

export default MenuPage;
import React from 'react';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import StyledComponent from '../../utils/StyledComponent';
import Panel from '../../components/Panel';
import navMenuSlice from '../../slices/navMenu';
import PopoverList from '../../components/PopoverList';

import genClasses from '../../utils/genClasses';

export const mNavMenuBar = {
    id: 'm-navMenuBar',
    props: {
        styledElement: StyledComponent('div', (theme: any) => ({
            marginLeft: theme.globals.padding,
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'flex'
            }
        })),
        defaultContent: 'm-navMenuBar'
    },
    element: Panel,
    children: [
        {
            id: 'm-navMenu',
            props: {
                styledElement: StyledComponent('div', (theme: any) => ({
                    backgroundColor: theme.navMenu.backgroundColor
                })),
                defaultContent: 'm-navMenu'
            },
            element: (_props: any) => {
                const useStyle = makeStyles((theme: any) => ({
                    popoverPaper: {
                        width: theme.navbarPopoverPaper.width
                    },
                    buttonLabel: {
                        color: theme.navbar.color
                    },
                    nested: {
                        paddingLeft: theme.navbar.nestedPaddingLeft
                    }
                }));
                const useMuiStyle = makeStyles((theme: any) => ({
                    'list:root': {},
                    'listItem:root': {},
                    'listItem:button': {
                        '&:hover': {
                            backgroundColor: theme.extrabar.backgroundColorHover,
                            color: theme.extrabar.colorHover
                        }
                    }
                }));

                const classes = useStyle();
                const muiClasses = useMuiStyle();

                const menu = useSelector((state: any) => state.navMenu.mobileMenu);
                const dispatch = useDispatch();
                const updateMenu = (id: string, newMenu: any) => {
                    dispatch(navMenuSlice.actions.updateMobileMenu({ id, menu: newMenu }));
                };
                return (
                    <PopoverList
                        muiClasses={genClasses(muiClasses, ['list', 'listItem'])}
                        classes={classes}
                        menu={menu}
                        updateMenu={updateMenu}
                    />
                );
            }
        }
    ]
};

export const navMenuBar = {
    id: 'navMenuBar',
    props: {
        styledElement: StyledComponent('div', (theme: any) => ({
            marginLeft: theme.globals.padding,
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        })),
        defaultContent: 'm-navMenuBar'
    },
    element: Panel,
    children: [
        {
            id: 'navMenu',
            props: {
                styledElement: StyledComponent('div', (theme: any) => ({
                    backgroundColor: theme.navMenu.backgroundColor
                })),
                defaultContent: 'navMenu'
            },
            element: (_props: any) => {
                const useStyle = makeStyles((theme: any) => ({
                    popoverPaper: {
                        width: theme.navbarPopoverPaper.width
                    },
                    buttonLabel: {
                        color: theme.navbar.color
                    },
                    nested: {
                        paddingLeft: theme.navbar.nestedPaddingLeft
                    }
                }));
                const useMuiStyle = makeStyles((theme: any) => ({
                    'list:root': {},
                    'listItem:root': {},
                    'listItem:button': {
                        '&:hover': {
                            backgroundColor: theme.extrabar.backgroundColorHover,
                            color: theme.extrabar.colorHover
                        }
                    }
                }));
                const classes = useStyle();
                const muiClasses = useMuiStyle();

                const menu = useSelector((state: any) => state.navMenu.menu);
                const dispatch = useDispatch();
                const updateMenu = (id: string, newMenu: any) => {
                    dispatch(navMenuSlice.actions.updateMenu({ id, menu: newMenu }));
                };
                if (!_.isEmpty(menu.children)) {
                    return menu.children.map((v: any, _i: number) => (
                        <PopoverList
                            muiClasses={genClasses(muiClasses, ['list', 'listItem'])}
                            classes={classes}
                            key={v.id}
                            menu={v}
                            updateMenu={updateMenu}
                        />
                    ));
                }
                return null;
            }
        }
    ]
};

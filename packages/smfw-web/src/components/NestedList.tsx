import React from 'react';
import _ from 'lodash';
import { List } from '@material-ui/core';

import NestedListItem from './NestedListItem';
import menuForeach from '../utils/menuForeach';

export interface NestedListProps {
    menu: any;
    updateMenu: any;
    classes: any;
}

function NestedList(props: NestedListProps) {
    const { menu, updateMenu, classes } = props;

    function handleClick(cm: any) {
        if (typeof cm.onClick === 'function') {
            cm.onClick(cm);
        }

        const open = !cm.open;
        const mm = _.cloneDeep(cm);
        menuForeach(mm, (m: any, _pmenu: any, _i: any) => {
            if (typeof m.open !== 'undefined') {
                m.open = false;
            }
        });
        updateMenu(mm.id, { ...mm, open });
    }

    const listClasses = {
        root: classes.listRoot
    };

    return (
        <List classes={listClasses} component='nav' aria-labelledby='nested-list-subheader'>
            {menu.children.map((v: any, _i: number) => (
                <NestedListItem
                    onClick={handleClick}
                    key={v.id}
                    classes={classes}
                    menu={v}
                    open={v.open}
                    nested={false}
                    depth={0}
                />
            ))}
        </List>
    );
}

export default NestedList;

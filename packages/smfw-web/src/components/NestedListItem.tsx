import React from 'react';
import _ from 'lodash';

import { List, ListItem, ListItemText, Icon, Collapse } from '@material-ui/core';

export interface NestedListItemProps {
    menu: any;
    open: boolean;
    nested: boolean;
    depth: number;
    onClick: any;
    classes: any;
}

function NestedListItem(props: NestedListItemProps) {
    const { menu, open, nested, depth, onClick, classes } = props;

    const className = (classes as any).nested;
    const attrs: any = {};
    if (typeof nested !== 'undefined' && nested !== false) {
        attrs.className = className;
    }

    const listClasses = {
        root: classes.listRoot
    };
    const listItemClasses = {
        root: classes.listItemRoot,
        button: classes.listItemButton
    };

    return (
        <div {...attrs}>
            <ListItem classes={listItemClasses} button onClick={() => onClick(menu)}>
                <ListItemText primary={menu.label} />
                {!_.isEmpty(menu.children) && (open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>)}
            </ListItem>
            {!_.isEmpty(menu.children) && (
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List classes={listClasses} component='div' disablePadding>
                        {menu.children.map((v: any, _i: number) => (
                            <NestedListItem
                                onClick={onClick}
                                key={v.id}
                                classes={classes}
                                menu={v}
                                open={v.open}
                                nested
                                depth={depth + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </div>
    );
}

export default NestedListItem;

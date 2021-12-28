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
    muiClasses: any;
}

function NestedListItem(props: NestedListItemProps) {
    const { menu, open, nested, depth, onClick, classes, muiClasses } = props;

    const className = (classes as any).nested;
    const attrs: any = {};
    if (typeof nested !== 'undefined' && nested !== false) {
        attrs.className = className;
    }

    return (
        <div {...attrs}>
            <ListItem classes={muiClasses.listItem} button onClick={() => onClick(menu)}>
                <ListItemText primary={menu.label} />
                {!_.isEmpty(menu.children) && (open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>)}
            </ListItem>
            {!_.isEmpty(menu.children) && (
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List classes={muiClasses.list} component='div' disablePadding>
                        {menu.children.map((v: any, _i: number) => (
                            <NestedListItem
                                onClick={onClick}
                                key={v.id}
                                muiClasses={muiClasses}
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

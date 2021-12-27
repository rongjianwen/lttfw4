import React from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Drawer, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import outlinerSlice from '../slices/outliner';

const minDrawerWidth = 120;
const maxDrawerWidth = 360;
const draggerWidth = 3;
const draggerBackgroundColor = 'rgb(255, 255, 255)';

function Outliner(props: any) {
    const dispatch = useDispatch();
    const drawerWidth = useSelector((state: any) => state.outliner.width);

    function handleMouseMove(e: any) {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
            dispatch(outlinerSlice.actions.setWidth({ width: newWidth }));
        }
    }

    function handleMouseDown(_e: any) {
        document.addEventListener('mouseup', handleMouseUp, true);
        document.addEventListener('mousemove', handleMouseMove, true);
    }

    function handleMouseUp(_e: any) {
        document.removeEventListener('mouseup', handleMouseUp, true);
        document.removeEventListener('mousemove', handleMouseMove, true);
    }

    const open = useSelector((state: any) => state.outliner.open);

    const useStyles = makeStyles((theme: any) => ({
        nested: {
            paddingLeft: theme.spacing(4)
        },
        drawer: {
            width: drawerWidth
        },
        paper: {
            width: drawerWidth,
            borderRight: 0
        },
        drawerDnone: {
            width: 0
        },
        paperDnone: {
            width: 0
        },
        dragger: {
            width: draggerWidth,
            cursor: 'ew-resize',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: draggerBackgroundColor
        }
    }));
    const classes = useStyles();

    const navigate = useNavigate();
    const engine = props.engine;
    const { pages } = engine;

    const categories: any = {};
    _.forEach(pages, (v: any, _i: number) => {
        const catName = v.title.split(' - ')[0];
        if (typeof categories[catName] === 'undefined') {
            categories[catName] = [];
        }
        categories[catName].push(v);
    });

    return (
        <Drawer
            classes={{
                root: clsx(classes.drawer, !open && classes.drawerDnone),
                paper: clsx(classes.paper, !open && classes.paperDnone)
            }}
            variant='persistent'
            anchor='left'
            open={open}
            transitionDuration={0}
        >
            <a role='button' tabIndex={0} onMouseDown={(e) => handleMouseDown(e)} className={classes.dragger}>
                {' '}
            </a>
            {_.keys(categories).map((catName: any, _i: number) => (
                <List key={catName} component='nav'>
                    <ListItem button>
                        <ListItemText primary={catName} />
                    </ListItem>
                    <Collapse in={true} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            {categories[catName].map((page: any, _ii: number) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    onClick={() => {
                                        navigate(page.path);
                                    }}
                                    key={page.title.split(' - ')[1]}
                                >
                                    <ListItemText primary={page.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            ))}
        </Drawer>
    );
}

export default Outliner;

import React from "react";
import AccountMenu from "./AccountMenu";
import { Tabs, Tab, Toolbar, AppBar, Box, Typography } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        palette:{
            primary:{
                main: 'a0a0a0'
            }
        },
    },
    logo: {
        width: 45,
        height: 45,
    },
});

const Navbar = (props) => {
    const classes = useStyles();
    const match = useRouteMatch(['/contacts', '/companies', '/deals']);
    const currentPath = match?.path ?? '/';

    return (
        <>
           <nav className={classes.root}>
           <AppBar position="static" color="primary">
                <Toolbar variant="dense">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <img
                                className={classes.logo}
                                src={
                                    '/BitsRMl_logo_small.png'
                                }
                                alt="BitsRm Logo"
                            />
                            <Typography component="span" variant="h5">
                                BitsRM
                            </Typography>
                        </Box>
                        <Box>
                            <Tabs
                                value={currentPath}
                                aria-label="Navigation Tabs"
                                textColor='ffffff'
                                indicatorColor='ffffff'
                            >
                                <Tab
                                    label={'Dashboard'}
                                    component={Link}
                                    to="/"
                                    value="/"
                                />
                                <Tab
                                    label={'Graph'}
                                    component={Link}
                                    to="/graph"
                                    value="/graph"
                                />
                                <Tab
                                    label={'Companies'}
                                    component={Link}
                                    to="/companies"
                                    value="/companies"
                                />
                                {/*<Tab
                                    label={'Deals'}
                                    component={Link}
                                    to="/deals"
                                    value="/deals"
                                />*/}
                            </Tabs>
                        </Box>
                        <Box display="flex">
                            <AccountMenu />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </nav>
        </>
    );
};
export default Navbar;


import React from "react";
import AccountMenu from "./AccountMenu";
import { Tabs, Tab, Toolbar, AppBar, Box, Typography } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import {useSelector} from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import { NavLink } from 'react-router-dom'
import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.css'

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
    const user = useSelector(state=>state.userReducer);
    const classes = useStyles();
    const match = useRouteMatch(['/contacts', '/companies', '/deals', '/users', '/customers']);
    const currentPath = match?.path ?? '/';

    return (
        <> 
        {/* <Backdrop
		sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
		open={(user.loading)}
  	> */}
		{/* <CircularProgress color="inherit" />
    </Backdrop>
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
                                BitsRM {user.user.isAdmin ? "Admin" : null}
                            </Typography>
                        </Box>
                        <Box>
                            <Tabs
                                value={currentPath}
                                aria-label="Navigation Tabs"
                                textColor='ffffff'
                                indicatorColor='ffffff'
                            >{<Tab
                              label={'Deals'}
                              component={Link}
                              to="/"
                              value="/"
                            />}
                            {! user.user.isAdmin ?
                            <Tab
                              label={'Dashboard'}
                              component={Link}
                              to="/graph"
                              value="/graph"
                            />
                              :null}
                            {! user.user.isAdmin ?
                              <Tab
                                label={'Customer'}
                                component={Link}
                                to="/customers"
                                value="/customers"
                              />
                              :null}


                            {user.user.isAdmin ?
                              <Tab
                                label={'Users'}
                                component={Link}
                                to="/users"
                                value="/users"
                              />
                              :null}
                            </Tabs>
                        </Box>
                        <Box display="flex">
                            <AccountMenu />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </nav> */}
        <div className="">
            {/* <figure className="p-0 m-0 mb-2">
                    <img className="dashboard-logo" src={logo} alt="" srcset="" />
                </figure> */}
                <nav className="navbar navbar-expand d-flex flex-column align-item-start float-start" id="sidebar">
                <li className="mt-5"><AccountMenu /></li>
                    <ul className="navbar-nav d-flex flex-column mt-5 w-100">
                        <NavLink className="nav-link text-light pb-4" to="/"><i className="zmdi zmdi-home fs-1"></i></NavLink>
                        <NavLink className="nav-link text-light pb-4" to="/graph"><i className="zmdi zmdi-chart fs-1"></i></NavLink>
                        <NavLink className="nav-link text-light pb-4" to="/customers"><i className="zmdi zmdi-phone fs-1"></i></NavLink>
                    </ul>
                </nav>
            </div>
        
        </>
    );
};
export default Navbar;


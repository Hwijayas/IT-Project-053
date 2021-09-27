//this entire chunk of code is slightly modified from https://github.com/zeroabsolute/MonorepoHerokuDeployment/blob/master/src/web-client/src/App.js
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/pages/About';
import {ProtectedRoute, PublicRoute} from './components/ProtectedRoute';
import { logout, verifyUser } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LoginComponent from './components/LoginComponent';
import { DealListContent } from './components/deals/DealListContent';
import Deals from './components/deals/Deals';

const App = () => {
  /*authenticate user if jwt exists */
  const userReducer = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyUser());
  },[userReducer.loggedIn, dispatch]);
  
  /*sign-in modal handles*/
  const [open, setOpen] = useState(true);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
    <Redirect to='/'/>
	};
  const handleLogout = () => {
    dispatch(logout());
    return (
      <Redirect to="/login"/>
    )
  }
  return (
    <div className='App'>
      <Router>
      <Navbar loggedIn={userReducer.loggedIn} handleOpen={handleOpen} handleLogout={handleLogout}/>
      <Switch>
        <ProtectedRoute exact path='/' loggedIn={userReducer.loggedIn} component={Dashboard}/>
        <Route exact path='/about' component={About}/>
        <ProtectedRoute  exact path='/deals' loggedIn={userReducer.loggedIn} open={open} component={Deals}/>
        <PublicRoute path="/login" loggedIn={userReducer.loggedIn} open={open} handleClose={handleClose} component={LoginComponent}/>
        <PublicRoute path="/sign-up" loggedIn={userReducer.loggedIn} open={open} handleClose={handleClose} component={LoginComponent} />
      </Switch>
      </Router>
    </div>
  );
};
export default App;
//this entire chunk of code is slightly modified from https://github.com/zeroabsolute/MonorepoHerokuDeployment/blob/master/src/web-client/src/App.js
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/pages/About';
import CustomizedSnackbars from './components/SnackBar'
import {AdminRoute, ProtectedRoute, PublicRoute} from './components/ProtectedRoute';
import { logout, verifyUser} from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LoginComponent from './components/LoginComponent';
import Users from './components/crudUsers'
import Deals from "./components/deals/Deals"
import Customers from './components/crudCustomer'
import { viewUsers } from './actions/adminActions';


const App = () => {
  /*authenticate user if jwt exists */
  const userReducer = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyUser());
    if (userReducer.user.isAdmin) {dispatch(viewUsers());}
  },[userReducer.loggedIn, dispatch]);
  
  /*sign-in modal handles*/
  const handleLogout = () => {
    dispatch(logout());
    return (
      <Redirect to="/login"/>
    )
  }
  return (
    <>
    <div className='App'>
      <Router>
      <Navbar loggedIn={userReducer.loggedIn} handleLogout={handleLogout}/>
      <Switch>
        <ProtectedRoute exact path='/' component={Deals}/>
        <ProtectedRoute exact path='/graph' component={Dashboard} />
        <ProtectedRoute exact path='/change-password' component={LoginComponent} />
        <ProtectedRoute exact path='/customers' component={Customers} />
        <AdminRoute exact path='/users' component={Users} />
        <Route exact path='/about' component={About}/>
        <PublicRoute path="/login" component={LoginComponent}/>
        <PublicRoute path="/sign-up" component={LoginComponent} />
      </Switch>
      </Router>
      <CustomizedSnackbars/>
    </div>
    </>
  );
};
export default App;
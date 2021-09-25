//this entire chunk of code is slightly modified from https://github.com/zeroabsolute/MonorepoHerokuDeployment/blob/master/src/web-client/src/App.js
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import { logout, verifyUser } from './actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import LoginComponent from './components/LoginComponent';
const App = () => {
  /*authenticate user if jwt exists */
  const userReducer = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyUser());
  },[dispatch]);
  
  /*sign-in modal handles*/
  const [open, setOpen] = useState(true);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
    <Redirect to='/about'/>
	};
  return (
    <div className='App'>
      <Router>
      <Navbar loggedIn={userReducer.loggedIn} handleOpen={handleOpen} handleLogout={logout}/>
      <Switch>
        <ProtectedRoute exact path='/' loggedin={userReducer.loggedIn} component={Dashboard}/>
        <Route exact path='/about' component={About}/>
        <Route exact path="/login" >
          <LoginComponent open={open} handleClose={handleClose}/>
        </Route>
        <Route exact path="/sign-up">
          <LoginComponent open={open} handleClose={handleClose}/>
        </Route>
      </Switch>
      </Router>
    </div>
  );
};
export default App;
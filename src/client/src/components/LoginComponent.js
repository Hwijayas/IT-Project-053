import React, {useEffect} from 'react';
import Form from './Form'
import { Redirect } from 'react-router';
import { useLocation, Link} from 'react-router-dom';
import Fade from '@mui/material/Fade';
import {Button, Dialog, DialogTitle, Divider, DialogContent, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import { setAuth } from '../actions/userActions';
//login: username;password;
//signup: username;password;fname;lname

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});
const LoginComponent = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const route = (location.pathname.split('/')[1]);
  const userReducer = useSelector(state=>state.userReducer);
	const handleClose = () => {
		dispatch(setAuth(false));
    <Redirect to="/"/>
	};
  useEffect((()=>{
    dispatch(setAuth(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }),[])
  return(
    // props received from App.js
    <>
    <Typography><Link to="/login">Please Log In</Link> </Typography>
    <Dialog open={userReducer.authPopUp} TransitionComponent={Transition} handleClose={handleClose}>
      <DialogTitle>Enter Your Details Below <Button></Button></DialogTitle>
      <Divider/>    
      
      <DialogContent>
        <Form route={route} handleClose={handleClose}/>
        
      </DialogContent>
    </Dialog>
    </>
  ); 

}
export default (LoginComponent);
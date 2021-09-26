import React from 'react';
import Form from './Form'
import { useLocation } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import {Button, Dialog, DialogTitle, Divider, DialogContent} from '@mui/material';
//login: username;password;
//signup: username;password;fname;lname

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});
const LoginComponent = (props) => {
  const location = useLocation();
  const route = (location.pathname.split('/')[1]);
  return(
    // props received from App.js
    <>
    <Dialog open={props.open} TransitionComponent={Transition} handleClose={props.handleClose}>
      <DialogTitle>Enter Your Details Below <Button></Button></DialogTitle>
      <Divider/>    
      
      <DialogContent>
        <Form handleClose={props.handleClose} route={route}/>
        
      </DialogContent>
    </Dialog>
    </>
  ); 

}
export default (LoginComponent);
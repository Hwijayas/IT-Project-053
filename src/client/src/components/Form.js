import React from 'react';
import {Box,Button,ButtonGroup,Card,TextField} from '@mui/material'
import { makeStyles } from '@mui/styles';
import { fetchUser, signUp ,emptyErrors, setLoading, userChangePassword} from '../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form'
import { Redirect, useHistory} from 'react-router';
import {Link} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles (theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
    height: '50 vh',
		'& .MuiTextField-root': {
			width: '300px',
		}
	},
}));
const RedirectForm = (props) => {
	let content = '';
	let path = '';
	switch (props.route){
		case 'login':
      content = "I Don't have an Account"
      path = '/sign-up' 
      break;
    case 'sign-up':
      content = "I already have an account"
      path = '/login' 
      break;
    default:
      content = props.route;
	}
  return <Button href={path} variant="outlined" color='secondary'>{content}</Button>
}
const Form = ({route, handleClose}) => {
  const history = useHistory();
  const user = useSelector(state => state.userReducer)
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
		dispatch(emptyErrors());
		dispatch(setLoading(true));
		let res;
		if (!!data.newPassword){
			res = (userChangePassword({password: data.password, newPassword:data.newPassword}))
		}
		
		if (!data.firstName) {
			res = (fetchUser({"userEmail":data.userEmail, "password":data.password}))
		}else{
			res = (signUp(data))
		}
		if(res){
			await dispatch(res);
			dispatch(setLoading(false));
			<Redirect to={history.location.from}/>
		}else{
			dispatch(setLoading(false));
		}
  };

  if (route === 'change-password'){
	  return (
		  <>
		  <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
			<Card variant='default' disableElevation={true}>
			<img className='form-img' src='/BitsRMl_logo.svg' alt='logo' />
			</Card>
			<Controller
				name="password"
				control={control}
				defaultValue=""
				render={({ field: { onChange, password }, fieldState: { error } }) => (
					<TextField
						label="Old Password"
						variant="outlined"
						required
						value={password}
						onChange={onChange}
						error={!!error}
						helperText={error ? error.message : null}
						type="password"
					/>
				)}
				rules={{ required: 'Password required', minLength: 6 }}
			/>
      <Box sx={{height:20}}/>
			<Controller
				name="newPassword"
				control={control}
				defaultValue=""
				render={({ field: { onChange, newPassword }, fieldState: { error } }) => (
					<TextField
						label="New Password"
						variant="outlined"
						required
						value={newPassword}
						onChange={onChange}
						error={!!error}
						helperText={error ? error.message : null}
						type="password"
					/>
				)}
				rules={{ required: 'Password required', minLength: 6 }}
			/>
        <Box sx={{height:20}}/>
			{
				!!user.loginErrors ? 
					<>
					<Chip label={user.loginErrors} variant="filled" size='small' color='error' onDelete={null} />
					<Box sx={{height:10}}/>
					</>:null
			}
			<ButtonGroup variant="text" aria-label="text button group">
				<Button variant="contained" onClick={handleClose} component={Link} to="/">
					Cancel
				</Button>
				<Button type='submit' variant="contained" color="primary">
					Submit
				</Button>
			</ButtonGroup>
			</form>
		  </>
	  ) 
  }else {
  return (
	  <>
	<Backdrop
		sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
		open={(user.loading)}
  	>
		<CircularProgress color="inherit" />
    </Backdrop>
	
	<form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
	<Card variant='default' disableElevation={true}>
	<img className='form-img' src='/BitsRMl_logo.svg' alt='logo' />
	</Card>
	{
      route==='sign-up'?
      <>
	  <Box sx={{height:20}}/>
      <Controller
				name="firstName"
				control={control}
				defaultValue=""
				render={({ field: { onChange, firstName }, fieldState: { error } }) => (
					<TextField
            autoFocus
						label="First Name"
						variant="outlined"
						required
						value={firstName}
						onChange={onChange}
						error={!!error}
						helperText={error ? error.message : null}
					/>
				)}
				rules={{ required: 'First name required' }}
			/>
			<Box sx={{height:20}}/>
			<Controller
				name="lastName"
				control={control}
				defaultValue=""
				render={({ field: { onChange, lastName }, fieldState: { error } }) => (
					<TextField
						label="Last Name"
						variant="outlined"
						required
						value={lastName}
						onChange={onChange}
						error={!!error}
						helperText={error ? error.message : null}
					/>
				)}
				rules={{ required: 'Last name required' }}
			/>
      </>:null
	  
      }

			<Box sx={{height:20}}/>	
			<Controller
				name="userEmail"
				control={control}
				defaultValue=""
				render={({ field: { onChange, userEmail }, fieldState: { error } }) => (
					<TextField
						autoFocus
						label="Username"
						variant="outlined"
						required
						value={userEmail}
						onChange={onChange}
						error={!!error}
						helperText={error ? error.message : null}
						type="email"
					/>
				)}
				rules={{ required: 'Email required' }}
			/>
			<Box sx={{height:20}}/>
			<Controller
				name="password"
				control={control}
				defaultValue=""
				render={({ field: { onChange, password }, fieldState: { error } }) => (
					<TextField
						label="Password"
						variant="outlined"
						required
						value={password}
						onChange={onChange}
						error={!!error}
						helperText={error ? error.message : null}
						type="password"
					/>
				)}
				rules={{ required: 'Password required', minLength: 6 }}
			/>
      <Box sx={{height:20}}/>
			{
				!!user.loginErrors ? 
					<>
					<Chip label={user.loginErrors} variant="filled" size='small' color='error' onDelete={null} />
					<Box sx={{height:10}}/>
					</>:null
			}
			<ButtonGroup variant="text" aria-label="text button group">
				<Button type='submit' variant="contained" color="primary">
					Submit
				</Button>
			</ButtonGroup>
      <Box sx={{height:10}}/>
			<Box sx={{height:20}}><RedirectForm route={route}/></Box>
      <Box sx={{height:20}}/>
		</form>
		</>
	)};
};

export default Form;
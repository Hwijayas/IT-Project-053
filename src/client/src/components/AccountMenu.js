import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import {Logout, Password} from '@mui/icons-material/';
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions';

const AccountMenu = () => {
  const userReducer = useSelector(state => state.userReducer);
  const user = (userReducer.loggedIn === true) ? userReducer.user: {firstName:'N', lastName: 'A'};
  const dispatch = useDispatch();
  const userAvatar = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=f0defd&bold=true&color=424242&rounded=true`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    console.log('logout pressed')
    dispatch(logout());
    return (
      <Redirect to="/login"/>
    )
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar alt={user} src={userAvatar} sx={{ width: 40, height: 40 }}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {userReducer.loggedIn ?<>
        <MenuItem>
          <Avatar/>
          {`${userReducer.user.firstName} ${userReducer.user.lastName}`}
        </MenuItem>
        <MenuItem to="/change-password" component={Link}>
          <ListItemIcon>
            <Password fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        </>:
        <MenuItem component={Link} to="/login">
          <Avatar /> Log In Here
        </MenuItem>}
      </Menu>
    </React.Fragment>
  );
}
export default AccountMenu
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useSelector, useDispatch} from 'react-redux';
import {clearMsg} from '../actions/userActions'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars=()=> {
  const dispatch = useDispatch();
  const reducer = useSelector(state => state.userReducer);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(clearMsg());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={(reducer.message!=='')} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {reducer.message}
        </Alert>
      </Snackbar>
      </Stack>
  );
}
export default CustomizedSnackbars
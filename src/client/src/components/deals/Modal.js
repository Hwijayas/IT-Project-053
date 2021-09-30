
import {useForm, Controller} from 'react-hook-form'
import {Box, TextField, Button, Dialog, DialogContent, DialogActions, MenuItem, Select, InputLabel} from '@mui/material';
import "./Modal.css"
import {useDispatch} from 'react-redux';
import {addDeal, updateDeals, setEdit} from "./crudFunctions"

//modal window for getting inputs, change between edit mode or add mode
const Modal = ({handleClose, open, edit}) => {
    const dispatch = useDispatch();
    const { handleSubmit, control} = useForm();
    const showHideClassName = open ? "modal display-block" : "modal display-none";
    
    const onSubmit = async (data) => {
        console.log("submit")
        
        let res;
        {edit === true ? res = updateDeals(data): res = addDeal(data)}
       
        if(res){
			dispatch(res);
        }
        dispatch(setEdit(false))
    };

    return (
        
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog open={open} 
                    
                className={showHideClassName}  
                fullWidth
                maxWidth="sm">
                {edit === false ?
                    <DialogContent>
                    
                        <Box sx={{height:20} }/>
                        <Controller
		    	        	name="dealName"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, dealName }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Deal Name"
		    	        			variant="standard"
		    	        			required
		    	        			value={dealName}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Deal Name required' }}
		    	        />
                        <Box sx={{height:20}}/>
                        <Controller
		    	        	name="customerName"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, customerName }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Customer Name"
		    	        			variant="standard"
		    	        			required
		    	        			value={customerName}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Customer Name required' }}
		    	        />

                        <Box sx={{height:20}}/>
                        <Controller
		    	        	name="customerCompanyName"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, customerCompanyName }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Customer Company Name"
		    	        			variant="standard"
		    	        			required
		    	        			value={customerCompanyName}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Customer Company Name required' }}
		    	        />
                        <Controller
		    	        	name="customerEmail"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, customerEmail }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Customer Email"
		    	        			variant="standard"
		    	        			required
		    	        			value={customerEmail}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Customer Email required' }}
		    	        />
                        <Controller
		    	        	name="customerPhone"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, customerPhone }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Customer Phone"
		    	        			variant="standard"
		    	        			required
		    	        			value={customerPhone}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Customer Phone required' }}
		    	        />
                        <Box sx={{height:20, width: 50}}/>
                        <Controller
		    	        	name="dealValue"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, dealValue }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Deal Value"
		    	        			variant="standard"
		    	        			required
		    	        			value={dealValue}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Deal Value required' }}
		    	        />

                            
                            
                        {/* <Controller
		    	        	name="dealValue"
		    	        	control={control}
                        
		    	        	render={({ field: { onChange, status }, fieldState: { error } }) => (

                                    <InputLabel variant="standard" >Status
                                        <Select
                                          labelId="status-select"
                                          id="status"
                                          value={status}
                                          label="Status"
                                          defaultValue= "Pending"
                                          onChange={onChange}
                                        >
                                          <MenuItem value={"Pending"}>Pending</MenuItem>
                                          <MenuItem value={"Accepted"}>Accepted</MenuItem>
                                          <MenuItem value={"Declined"}>Declined</MenuItem>
                                          <MenuItem value={"Done"}>Done</MenuItem>
                                        </Select>
                                    </InputLabel>

		    	        	)}
		    	        	rules={{ required: 'Deal Status required' }}
                            
		    	        /> */}


                    </DialogContent>

                :
                    <DialogContent>
                        <Box sx={{height:20} }/>
                        <Controller
		    	        	name="dealName"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, dealName }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Deal Name"
		    	        			variant="standard"
		    	        			required
		    	        			value={dealName}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Deal Name required' }}
		    	        />

                        <Box sx={{height:20, width: 50}}/>
                        <Controller
		    	        	name="dealValue"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, dealValue }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Deal Value"
		    	        			variant="standard"
		    	        			required
		    	        			value={dealValue}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Deal Value required' }}
		    	        />
                    </DialogContent>
                }
                <DialogActions>
			        <Button variant="contained" onClick={handleClose}>
			        	Cancel
			        </Button>
			        <Button type='submit' variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
			        	Submit
			        </Button>
                </DialogActions>
            </Dialog>      
                 
        </form>
        
    );
  };

  export default Modal;
import { makeStyles } from '@mui/styles';
import {useForm, Controller} from 'react-hook-form'
import {Box, TextField, Button, Dialog, DialogContent, DialogActions, Grid, Select, MenuItem, InputLabel} from '@mui/material';
import "./Modal.css"
import {useDispatch, useSelector} from 'react-redux';
import {addDeal } from "./crudFunctions"
import { Redirect } from 'react-router';

//modal window for getting inputs, need to change it to be reuasable
const Modal = ({ handleClose,  open }) => {
    const dispatch = useDispatch();
    const { handleSubmit, control, clearErrors } = useForm();
    const showHideClassName = open ? "modal display-block" : "modal display-none";
    

    const onSubmit = async (data) => {
        console.log("submit")
        // console.log(data)
        const res = addDeal(data);
        if(res){
			dispatch(res);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog open={open} 
                    onClose={clearErrors()}
                    className={showHideClassName}  
                    fullWidth
                    maxWidth="sm">
                <DialogContent>
                
                        <Box sx={{height:20} }/>
                        <Controller
		    	        	name="dealName"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, DealName }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Deal Name"
		    	        			variant="standard"
		    	        			required
		    	        			value={DealName}
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
		    	        	render={({ field: { onChange, CustomerName }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Customer Name"
		    	        			variant="standard"
		    	        			required
		    	        			value={CustomerName}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Customer Name required' }}
		    	        />
                        <Box sx={{height:20, width: 50}}/>
                        <Controller
		    	        	name="dealValue"
		    	        	control={control}
		    	        	defaultValue=""
		    	        	render={({ field: { onChange, DealValue }, fieldState: { error } }) => (
		    	        		<TextField
                                    autoFocus
		    	        			label="Deal Value"
		    	        			variant="standard"
		    	        			required
		    	        			value={DealValue}
		    	        			onChange={onChange}
		    	        			error={!!error}
                                    fullWidth
		    	        			helperText={error ? error.message : null}
		    	        		/>
		    	        	)}
		    	        	rules={{ required: 'Deal Value required' }}
		    	        />

                        

                        <Controller
		    	        	name="dealValue"
		    	        	control={control}
		    	        	defaultValue="Pending"
		    	        	render={({ field: { onChange, status }, fieldState: { error } }) => (
                                <>
                                    <InputLabel variant="standard" >Status</InputLabel>
                                        <Select
                                          labelId="status-select"
                                          id="status"
                                          value={status}
                                          label="Status"
                                          onChange={onChange}
                                        >
                                          <MenuItem value={"Pending"}>Pending</MenuItem>
                                          <MenuItem value={"Accepted"}>Accepted</MenuItem>
                                          <MenuItem value={"Declined"}>Declined</MenuItem>
                                          <MenuItem value={"Done"}>Done</MenuItem>
                                        </Select>
                                </>
		    	        	)}
		    	        	rules={{ required: 'Deal Status required' }}
                            
		    	        />
                        
                    
                </DialogContent>
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
        /*
      <div className={showHideClassName}>
        <section className="modal-main">
          
            <button className="modal_close_btn" type="button" onClick={handleClose}>
                <span className='close-btn' >×</span>
            </button>

        <div className="form-content">
            <div className="form-inputs">
                <label htmlFor="deal_name" className="form-label">Deal Name</label>
                <input type="text" 
                    name="username" 
                    className="form-input" 
                    placeholder="Enter Deal Name"
                    id="deal_name"/> 
            </div>

            <div className="form-inputs">
                <label htmlFor="customer_name" className="form-label">Customer Name</label>
                <input type="text" 
                    name="username" 
                    className="form-input" 
                    placeholder="Enter Customer Name"
                    id="customer_name"/> 
            </div>

            <div className="form-inputs">
                <label htmlFor="deal_value" className="form-label">Deal Value</label>
                <input type="text" 
                    name="deal_value" 
                    className="form-input" 
                    placeholder="Enter Deal Value"
                    id="deal_value"/> 
            </div>
            
            <button className="form-input-btn" type="submit">Create Deal</button>
        </div>

        

        </section>
      </div>
      */
        
    );
  };

  export default Modal;
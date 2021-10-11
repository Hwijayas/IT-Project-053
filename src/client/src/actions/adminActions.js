import {useSelector } from 'react-redux'
import { emptyErrors , setErrors } from './userActions';
const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000/admin' : 'https://bits-please-api.herokuapp.com/admin';
const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json"
}

const setDeals = (data) => ({
    type:"SET_DEALS",
    payload: data
})
export const viewFlaggedDeals = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    const args = {
        method: 'GET',
        headers:{
            ...headers,
            authentication: token
        }
    };
    const res = await fetch(`${url}/deals/flagged`, args);
    const data = await res.json();
    if(data.success === "false"){
        dispatch(setErrors(data.msg))
    }else{
        dispatch(setDeals(data.deals));
        dispatch(emptyErrors());
    }
}
export const viewAllDeals = () => async dispatch =>{
    const token = localStorage.getItem("token");
    const args = {
        method: 'GET',
        headers:{
            ...headers,
            authentication: token
        }
    };
    const res = await fetch(`${url}/deals/`, args);
    const data = await res.json();
    if(data.success === "false"){
        dispatch(setErrors(data.msg));
    }else{
        dispatch(setDeals(data.deals));
        dispatch(emptyErrors());
    }
}
export const deleteUser = (uid) => async dispatch => {
    const token = localStorage.getItem("token");
    const args = {
        method: 'GET',
        headers:{
            ...headers,
            authentication: token
        }
    };
    const res = await fetch(`${url}/deals/`, args);
    const data = await res.json();
}

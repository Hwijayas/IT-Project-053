import {useSelector } from 'react-redux'
import { emptyErrors , setErrors } from './userActions';
const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : 'https://bits-please-api.herokuapp.com';
const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json"
}

const setUsers = (data) => ({
    type:"SET_USERS",
    payload: data
})
export const viewUsers = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    const args = {
        method: 'GET',
        headers:{
            ...headers,
            Authorization: `${token}`
        }
    };
    const res = await fetch(`${url}/users`, args);
    const data = await res.json();
    if(data.success === "false"){
        dispatch(setErrors(data.msg))
    }else{
        dispatch(setUsers(data.users));
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

import {useSelector } from 'react-redux'
import { emptyErrors , setErrors } from './userActions';
import Axios from 'axios'
import { Redirect } from "react-router";
import { setLoading } from './userActions';
const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : 'https://bits-please-api.herokuapp.com';
const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json"
}

const setUsers = (data) => ({
    type:"SET_USERS",
    payload: data
})

const setDelete= (payload) => ({ type: "DELETE_USER", payload})

export const update_User= (payload) => ({ type: "UPDATE_USER", payload : payload})

export const viewUsers = () => async (dispatch) => {
    dispatch(setLoading(true));
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
    if(!!data){dispatch(setLoading(false));}
    if(data.success === "false"){
        dispatch(setErrors(data.msg))
    }else{
        for(let i=0; i<data.users.length; i++){
            data.users[i].isAdmin = data.users[i].isAdmin?"Yes":"No";
        }
        dispatch(setUsers(data.users));
        dispatch(emptyErrors());
    }
}

export const updateUser = (data) => async dispatch =>{
    console.log("updating")
    console.log(data)
    const token = await localStorage.getItem("token");
    const response = await Axios.put(`${url}/users/${data._id}`, {
        newEmail: data.userEmail,
      newFirstName: data.userFirstName,
      newLastName: data.userLastName
    }, {headers: {...headers, "Authorization": `${token}`,
            'Access-Control-Allow-Origin':'*' }}).catch(err => {
        console.log(err);
        alert(err);
        return dispatch(setErrors(data.msg))
    });


    if(response.success === "false"){
        dispatch(setErrors(response.msg))
    }
    alert("Updated successfully");
    dispatch(update_User(data))

}

export const deleteUser = (userID) => async (dispatch) =>{
    const token = await localStorage.getItem("token");
    const res = Axios.delete(`${url}/users/${userID}`, {
        headers: {...headers, "Authorization": `${token}`}

    }).catch(err => {
        console.log(err);
        alert(err);

    });


    if(res.success === false){
        return dispatch(setErrors(res.msg))
    }

    alert("Deleted successfully");
    dispatch(setDelete(userID));
}
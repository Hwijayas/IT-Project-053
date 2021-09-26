import { Redirect } from "react-router";

//const url = 'http://bits-please-api.herokuapp.com/user';
const url = 'http://localhost:5000/user';
export const setUser = (payload) => ({ type: "SET_USER", payload})

export const logout = () => ({type: "LOGOUT"});

export const setErrors = (errorsArr) => ({
    type: "SET_ERRORS",
    payload: errorsArr
})

export const emptyErrors = () => ({
    type: "EMPTY_ERRORS"
})

export const fetchUser = (userInfo) => dispatch => {
    console.log('fetchUser: '+ JSON.stringify(userInfo));
    fetch(`${url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => {
        if(res.success === false){
            return dispatch(setErrors(res.msg))
        }
        try{
        localStorage.setItem("token", res.token);
        dispatch(setUser(res.user));
        }catch(err){
            console.log(err);
        }
    })
}

export const signUp = (userInfo) => dispatch => {
    fetch(`${url}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => {
        if(res.success === false){
            return dispatch(setErrors(res.msg))
        }
        try{
        localStorage.setItem("token", res.token);
        dispatch(setUser(res.user));
        }catch(err){
            console.log(err);
        }
    })
}
export const verifyUser = () => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${url}/protected`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `${token}`
        }
    })
    .then(res => {
        if (res.success === true){
            dispatch(setUser(res.user))
        }else{
            localStorage.clear();
            <Redirect to="/login" />
        }
    })
}
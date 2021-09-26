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
export const setLoading = (loading)=>({
	type: "SET_LOADING",
	payload: loading
})

export const fetchUser =  (userInfo) => async dispatch => {
	const res = await fetch(`${url}/login`, {
		method: "POST",
		headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
		},
		body: JSON.stringify(userInfo)
	})
	const data = await res.json();
	if(data.success === false){
		return dispatch(setErrors(data.msg))
	}
	localStorage.setItem("token", data.token);
	dispatch(emptyErrors());
	dispatch(setUser(data.user));
}

export const signUp = (userInfo) => async dispatch => {
	const res = await fetch(`${url}/register`, {
		method: "POST",
		headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
		},
		body: JSON.stringify(userInfo)
	})
	const data = await res.json();
	if(data)console.log('sign-up data: '+ data);
	if(data.success === false){
		return dispatch(setErrors(data.msg))
	}
	localStorage.setItem("token", data.token);
	dispatch(emptyErrors());
	dispatch(setUser(data.user));
}

export const verifyUser = () => async dispatch => {
	const token = localStorage.getItem('token');
	if (!token){
		localStorage.clear();
		return <Redirect to="/login" />
	}
	const res = await fetch(`${url}/protected`, {
			method: 'GET',
			headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `${token}`
			}
	})
	const data = await res.json();
	if (data.success === true){
			dispatch(setUser(data.user))
	}else{
			localStorage.clear();
			<Redirect to="/login" />
	}
}
import { Redirect } from "react-router";

const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000/user' : process.env.HD_REACT_APP_API_URL;
const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json"
} 
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
export const setAuth = (menuState)=>({
	type: "SET_AUTH",
	payload: menuState,
})
export const userChangePassword = (userInfo) => async dispatch => {
	const token = localStorage.getItem("token");
	const res = await fetch(`${url}/password`, {
		method: "PUT",
		headers:{...headers, "Authorization": `${token}`},
		body: JSON.stringify(userInfo)
	})
	const data = await res.json();
	if(data.success === false){
		return dispatch(setErrors(data.msg));
	}else{
		dispatch(emptyErrors());

	}
}
export const fetchUser =  (userInfo) => async dispatch => {
	const res = await fetch(`${url}/login`, {
		method: "POST",
		headers: headers,
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
		headers: headers,
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

export const verifyUser = () => async dispatch => {
	const token = localStorage.getItem('token');
	if (!token){
		localStorage.clear();
		return <Redirect to="/login" />
	}
	const res = await fetch(`${url}/protected`, {
			method: 'GET',
			headers: {...headers, "Authorization": `${token}`}
	})
	const data = await res.json();
	console.log(data);
	if (data.success === true){
			dispatch(setUser(data.user));
	}else{
			localStorage.clear();
			<Redirect to="/login" />
	}
}
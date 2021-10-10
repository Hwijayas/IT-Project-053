import { Redirect } from "react-router";

const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000/users' : 'https://bits-please-api.herokuapp.com/users';
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
export const setMsg = (msg) => ({
	type: "SET_MESSAGE",
	payload: msg
})
export const clearMsg = () => ({
	type: "CLEAR_MESSAGE"
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
	
	const token = await localStorage.getItem("token");
	const res = await fetch(`${url}/password`, {
		method: "PUT",
		headers:{...headers,
			"Authorization": `${token}`,
			'Access-Control-Allow-Origin':'*'},
		body: JSON.stringify(userInfo),
		mode: 'cors',
	})
	const data = await res.json();
	if(data.success === false){
		return dispatch(setErrors(data.msg));
	}else{
		dispatch(setMsg("Password Changed!"));
		dispatch(emptyErrors());
		if(data.token){
			await localStorage.setItem("token", data.token);

		}
		
	}
}
const welcomeUser = (dispatch, getState) => {
	const state = getState();
	dispatch(setMsg(`Logged In as ${state.userReducer.user.email}`));

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
	dispatch(welcomeUser);
	await localStorage.setItem("token", data.token);
	dispatch(emptyErrors());
	dispatch(setUser(data.user));
}

export const signUp = (userInfo) => async dispatch => {
	const res = await fetch(`${url}`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(userInfo)
	})
	const data = await res.json();
	if(data.success === false){
		return dispatch(setErrors(data.msg))
	}
	dispatch(welcomeUser);
	await localStorage.setItem("token", data.token);
	dispatch(emptyErrors());
	dispatch(setUser(data.user));
}

export const verifyUser = () => async dispatch => {
	console.log('api: ');
	console.log(url);
	const token = await localStorage.getItem('token');
	if (!token){
		await localStorage.clear();
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
			dispatch(welcomeUser);
	}else{
			if(!!token){
				dispatch(setMsg("Session Expired, Please Log In agin."))
			}
			await localStorage.clear();
			<Redirect to="/login" />
	}
}
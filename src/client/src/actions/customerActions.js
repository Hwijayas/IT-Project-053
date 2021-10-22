import { emptyErrors , setErrors } from './userActions';
import Axios from 'axios'
import { setLoading } from './userActions';
const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000/customers' : 'https://bits-please-api.herokuapp.com/customers';
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

const setCustomer = (data) => ({
  type:"SET_CUSTOMERS",
  payload: data
})

const setDeleteCustomer= (payload) => ({ type: "DELETE_CUSTOMER", payload})

export const update_Customer= (payload) => ({ type: "UPDATE_CUSTOMER", payload : payload})

export const add_Customer= (payload) => ({ type: "ADD_CUSTOMER", payload})

export const viewCustomers = () => async (dispatch) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem("token");
  const args = {
    method: 'GET',
    headers:{
      ...headers,
      Authorization: `${token}`
    }
  };
  const res = await fetch(`${url}`, args);
  const data = await res.json();
  if(!!data){dispatch(setLoading(false));}

  if(data.success === false){
    dispatch(setErrors(data.msg))
  }else{
    dispatch(setCustomer(data.customers));
    dispatch(emptyErrors());
  }
}

export const updateCustomer = (data) => async dispatch =>{
  console.log("updating")
  console.log(data)
  const token = localStorage.getItem("token");
  const res = await fetch(`${url}/${data._id}`, {
    method: "PUT",
    headers:{...headers,
      "Authorization": `${token}`,
      'Access-Control-Allow-Origin':'*'},
    body: JSON.stringify(data),
    mode: 'cors',
  });
  const response = await res.json();

  if(response.success === false){
    dispatch(setErrors(response.msg))
  }else {
    alert("Updated successfully");
    dispatch(update_Customer(data))
  }
}

export const deleteCustomer = (userID) => async (dispatch) =>{
  const token =  localStorage.getItem("token");

  const response = await fetch(`${url}/${userID}`, {
    method: "DELETE",
    headers:{...headers,
      "Authorization": `${token}`},
  });
  const res = await response.json();

  if(res.success === false){
    alert(res.msg)
    return dispatch(setErrors(res.msg))
  }else {
    alert("Deleted successfully");
    dispatch(setDeleteCustomer(userID));
  }
}

export const addCustomer = (data) => async dispatch =>{
  console.log(data)
  const token = localStorage.getItem("token");

  const response = await Axios.post(`${url}`, {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
  }, {headers: {...headers, "Authorization": `${token}`} })

  if(response.success === false){
    return dispatch(setErrors(response.msg))
  }

  alert("Customer added successfully");
  dispatch(add_Customer(data))

}
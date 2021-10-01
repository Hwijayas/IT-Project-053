import Axios from "axios"
import { Redirect } from "react-router";
const url = "https://bits-please-api.herokuapp.com/user";
//const url = 'http://localhost:5000/user';

export const setDeal= (payload) => ({ type: "SET_DEALS", payload})

export const add_Deal= (payload) => ({ type: "ADD_DEAL", payload})

export const clearCurrent= () => ({ type: "CLEAR_CURRENT_DEAL"})

export const setCurrent= (payload) => ({ type: "SET_CURRENT_DEAL", payload})

export const setEdit= (payload) => ({ type: "SET_EDITING", payload})

export const setErrors = (errorsArr) => ({
    type: "SET_DEAL_ERRORS",
    payload: errorsArr
})

export const updateDeal= (id, status) => ({ type: "UPDATE_DEAL", payload : {id: id, status: status}})

export const setDelete= (payload) => ({ type: "DELETE_DEAL", payload})

const token = localStorage.getItem("token");

const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json",
    "Authorization": `${token}`,
} 


export const addDeal = (data) => async dispatch =>{
    console.log(localStorage.getItem('token'));
    console.log(data)
    const response = await Axios.post(`${url}/deal`, {
        
        dealName: data.dealName,
        value: data.dealValue,
        customer: {
            "name": data.customerName,
            "company": data.customerCompanyName,
            "email": data.customerEmail,
            "phone": data.customerPhone
        },
        status: data.status
        
    }, {headers: headers}).catch(err => {
        console.log(err);
        alert(err);
    });

    const responseOK = response && response.status === 201 

    if(responseOK){
        dispatch(add_Deal(response.data.deal))
    }
}


export const viewDeals = () => async dispatch =>{
    const deal = await Axios.get(`${url}/deal`, {
        headers: headers
    }).catch(err => {
        console.log(err);
        alert(err);
        
    });
    if(typeof(deal) !== "undefined"){
        //console.log(deal.data)
        dispatch(setDeal(deal.data))
        return deal.data;
    }
    
}

export const updateDeals = (data, dealId) => async dispatch =>{
    console.log("updating")
    console.log(data)
    const response = await Axios.put(`${url}/deal/${dealId}`, {
        params: {id: dealId},
        dealName: data.dealName, 
        value: data.dealValue 

    }, {headers: headers}).catch(err => {
        console.log(err);
        alert(err);
        return dispatch(setErrors(data.msg))
    });

    const responseOK = response && response.status === 201 

    if(responseOK){
        alert(response.msg);
        return <Redirect to="/deals" />
    }
}

export const updateDealStatus = (dealId, data) => async dispatch =>{
    const response = await Axios.put(`${url}/deal/${dealId}/status`,{
        status: data
    }, {headers: headers}).catch(err => {

        console.log(err);
        alert(err);
        return dispatch(setErrors(response.msg))
    });

    const responseOK = response && response.status === 201 

    if(responseOK){
        alert(response.msg);
        //dispatch(updateDeal(dealId, data))
    }
}

export const deleteDeal = (dealId) => async (dispatch) =>{
    const res = Axios.delete(`${url}/deal/${dealId}`, {
        params: {id: dealId},
        headers: headers

    }).catch(err => {
        console.log(err);
        alert(err);
        
    });

    // if(res.status === 200){
    //     dispatch(setDelete(dealId))
    // }
    
    if(res.success === false){
        return dispatch(setErrors(res.msg))
    }
    
    
}

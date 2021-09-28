import Axios from "axios"
import { Redirect } from "react-router";
const url = 'http://bits-please-api.herokuapp.com/user';
//const url = 'http://localhost:5000/user';

export const setDeal= (payload) => ({ type: "SET_DEALS", payload})

export const setErrors = (errorsArr) => ({
    type: "SET_DEAL_ERRORS",
    payload: errorsArr
})

//export const deleteDeal= (payload) => ({ type: "DELETE_DEAL", payload})

const token = localStorage.getItem('token');

const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json",
    "Authorization": localStorage.getItem('token')
} 


export const addDeal = (data) => async dispatch =>{
    console.log(localStorage.getItem('token'));
    const response = await Axios.post(`${url}/deal`, {
        
        dealName: data.dealName,
        value: data.dealValue,
        customer: {
            "name": data.customerName,
            "company": data.customerCompanyName,
            "email": data.customerEmail,
            "phone": data.customerPhone
        },
        
    }, {headers: headers}).catch(err => {
        console.log(err);
        alert(err);
    });

    const responseOK = response && response.status === 201 

    if(responseOK){
        dispatch(setDeal(response.deal))
        //return <Redirect to="/deals" />
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
        console.log(deal.data)
        return deal.data;
    }

    dispatch(setDeal(deal.data))
    
}


export const updateDeals = (data, dealId) => async dispatch =>{
    const response = await Axios.put(`${url}/deal/${dealId}`, {
        params: {id: dealId}

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
        status:""
    }, {headers: headers}).catch(err => {
        console.log(err);
        alert(err);
        return dispatch(setErrors(response.msg))
    });

    const responseOK = response && response.status === 201 

    if(responseOK){
        alert(response.msg);
        return <Redirect to="/deals" />
    }
}

export const deleteDeal = (dealId) => async dispatch =>{
    const res = Axios.delete(`${url}/deal/${dealId}`, {
        params: {id: dealId},
        headers: headers

    }, {headers: headers}).catch(err => {
        console.log(err);
        alert(err);
        
    });

    if(res.success === false){
        return dispatch(setErrors(res.msg))
    }
}

import Axios from "axios"
import { Redirect } from "react-router";
const passport = require('passport');
//const url = 'http://bits-please-api.herokuapp.com/user';
const url = 'http://localhost:5000/user';


//const token = 

const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json",
    "Authorization": localStorage.getItem('token')
} 

export const setErrors = (errorsArr) => ({
    type: "SET_ERRORS",
    payload: errorsArr
})


export const addDeal = (data) => async dispatch =>{
    console.log(typeof(token))
    console.log(data);
    const response = await Axios.post(`${url}/deal`, {

        data:{
            dealName: data.dealName,
            value: data.dealValue,
            customer: "61488cf91509c3be64a8b211",
            status: data.status,
        },

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



export const viewDeals = () => async dispatch =>{
    const deals = await Axios.get(`${url}/deal`, {

    }).catch(err => {
        console.log(err);
        alert(err);
        return dispatch(setErrors(deals.msg))
    });

    return deals;
}

export const updateDeals = (data, dealId) => async dispatch =>{
    const response = await Axios.put(`${url}/deal/${dealId}`, {
        params: {id: dealId}

    }).catch(err => {
        console.log(err);
        alert(err);
        return dispatch(setErrors(data.msg))
    });

    const responseOK = response && response.status === 201 

    if(responseOK){
        alert(response.msg);
        return <Redirect to="/" />
    }
}

export const updateDealStatus = (dealId, data) => async dispatch =>{
    const response = await Axios.put(`${url}/deal/${dealId}/status`,{
        status:""
    }).catch(err => {
        console.log(err);
        alert(err);
        return dispatch(setErrors(response.msg))
    });

    const responseOK = response && response.status === 201 

    if(responseOK){
        alert(response.msg);
        return <Redirect to="/" />
    }
}

export const deleteDeal = (dealId) => async dispatch =>{
    Axios.delete(`${url}/deal/${dealId}`, {
        params: {id: dealId}

    }).catch(err => {
        console.log(err);
        alert(err);
        
    });


}

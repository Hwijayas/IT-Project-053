import React, {useState} from 'react';
import FormLogin from '../FormLogin';
import "./Form.css"
import Axios from 'axios';
//import { response } from 'express';

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    function submitForm(){
        setIsSubmitted = (true);
    }

    
    const login = (username, pass) => {
        //console.log(process.env.REACT_APP_API_ENDPOINT);
        Axios.post("http://localhost:5000/user/login",{ 
            
            userEmail: username,
            password: pass
        }).then(async response => {
            // console.log(response);
            if(!response.ok){
                if(response.status === 401){
                    setError(response.data.msg);
                }
            }
        }).catch(error => {
            console.log(error);
            alert(error);
        });
    }
    

    return (
        <>   
        <div className='form-container'>
            {/* <span className='close-btn'>×</span> */}
            <div className='form-content-left'>
                <img className='form-img' src='BitsRMl_logo.svg' alt='logo' />
            </div>
            {/* {!isSubmitted ? <FormSignup submitForm={submitForm} /> : (<FormSuccess/>)} */}
            <FormLogin submitForm={submitForm} login={login}/>
        </div>
        </>
    )
}

export default Form

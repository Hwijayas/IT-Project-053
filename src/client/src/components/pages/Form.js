import React, {useState} from 'react';
import FormLogin from '../FormLogin';
import "./Form.css"
import Axios from 'axios';
//import { response } from 'express';

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm(){
        setIsSubmitted = (true);
    }

    
    const login = (username, pass) => {
        //console.log(process.env.REACT_APP_API_ENDPOINT);
        Axios.post("http://localhost:5000/user/login",{ 
            
            userEmail: username,
            password: pass
        }).then((response) => {
            console.log(response);
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

import React, {useState} from 'react';
import FormLogin from '../FormLogin';
import "./Form.css"
import Axios from 'axios';
//import { response } from 'express';

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    function submitForm(){
        setIsSubmitted = (true);
    }

    /*
    const login = () => {
        Axios.post("http://localhost5000/user/login",{ 
            userEmail: userEmail,
            password: password
        }).then((response) => {
            console.log(response);
        });
    }*/
    

    return (
        <>   
        <div className='form-container'>
            {/* <span className='close-btn'>×</span> */}
            <div className='form-content-left'>
                <img className='form-img' src='BitsRMl_logo.svg' alt='logo' />
            </div>
            {/* {!isSubmitted ? <FormSignup submitForm={submitForm} /> : (<FormSuccess/>)} */}
            <FormLogin submitForm={submitForm}/>
        </div>
        </>
    )
}

export default Form

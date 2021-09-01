import React, {useState} from 'react';
import FormLogin from '../FormLogin';
import "../../css/Form.css"
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
                    console.log(response.status);
                }
            }
            else{
                const data = await response.json()
                localStorage.setItem('token', data.token);
            }
        }).catch(err => {
            console.log(err);
            alert(err);
            
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

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

    
    const login = async (values) => {
        //console.log(process.env.REACT_APP_API_ENDPOINT);
        await Axios.post("http://localhost:5000/user/login",{ 
            // console.log()
            userEmail: values.username,
            password: values.password
        }).then(response => {
            
            const responseOK = response && response.status === 200 
            && response.statusText === 'OK';


            if(!responseOK){
                if(response.status === 401){
                    console.log(response.status);
                }
            }

            if(responseOK){
                console.log(response);
                localStorage.setItem('token', response.data.token);
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

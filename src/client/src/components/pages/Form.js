import React, {useState} from 'react';
import FormLogin from '../FormLogin';
import { Switch, useRouteMatch, Route, Link } from 'react-router-dom';
import "../../css/Form.css"
import Axios from 'axios';
import FormRegister from '../FormRegister';
//import { response } from 'express';

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLogin, setLogin] = useState(true);

    const {path, url} = useRouteMatch();
    
    function submitForm(){
        setIsSubmitted (true);
    }

    //change state of form
    function changeForm(){
        setLogin(!isLogin);
    }

    //register new user
    const register = async(values) => {
        //console.log(values);
        await Axios.post("https://bits-please-api.herokuapp.com/user/register",{
            
            userEmail: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password

        }).then(response => {

            const responseOK = response && response.status === 200 
            && response.statusText === 'OK';

            if(!responseOK){
                if(response.status === 422){
                    console.log(response.status);
                }
            }

            if(responseOK){

                console.log(response);
                alert("Successfully registered");
            }

        }).catch(err => {
            console.log(err);
            alert(err);
        })
    }
    

    //makes request to backend to get token 
    const login = async (values) => {
        //console.log(process.env.REACT_APP_API_ENDPOINT);
        //https://bits-please-web-client.herokuapp.com/user/login
        await Axios.post("https://bits-please-api.herokuapp.com/user/login",{ 
            // console.log()
            userEmail: values.username,
            password: values.password
        }).then(response => {
            
            const responseOK = response && response.status === 200 
            && response.statusText === 'OK';


            if(!responseOK){
                if(response.status === 401){
                    //put specific handling in here, 
                    //rn only console log even though we alr have catch
                    console.log(response.status);
                }
            }

            if(responseOK){
                console.log(response);
                alert("Succesfully Logged In")
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
                <img className='form-img' src='/BitsRMl_logo.svg' alt='logo' />
            </div>
            {/* {!isSubmitted ? <FormSignup submitForm={submitForm} /> : (<FormSuccess/>)} */}
            {/* <FormLogin submitForm={submitForm} login={login}/> */}
            {/* {isLogin ? <FormLogin submitForm={submitForm} login={login} changeForm={changeForm}/> : 
                <FormRegister submitForm={submitForm} changeForm = {changeForm} register={register}/>} */}
            
            <Switch>
                <Route path={`${path}/login`}>
                    <FormLogin submitForm={submitForm} login={login} changeForm={changeForm} url={url}/>
                </Route>
                <Route path={`${path}/sign-up`}>
                    <FormRegister submitForm={submitForm} changeForm = {changeForm} register={register} url={url}/>
                </Route>
            </Switch>
        </div>
        </>
    )
}

export default Form

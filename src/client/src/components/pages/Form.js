import React, {useState} from 'react';
import FormLogin from '../FormLogin';
import { Switch, useRouteMatch, Route, Link } from 'react-router-dom';
import "../../css/Form.css"
import FormRegister from '../FormRegister';
import { fetchUser } from '../../actions/userActions';


const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLogin, setLogin] = useState(true);

    const {path, url} = useRouteMatch();
    
    function submitForm(){
        setIsSubmitted (true);
    }

    const userInfo = {
        userEmail: '',
        password: ''};

    fetchUser(userInfo);
    

    return (
        <>   
        <div className='form-container'>
            {/* <span className='close-btn'>×</span> */}
            <div className='form-content-left'>
                <img className='form-img' src='/BitsRMl_logo.svg' alt='logo' />
            </div>
            {/* {!isSubmitted ? <FormSignup submitForm={submitForm} /> : (<FormSuccess/>)} */}
            <FormLogin submitForm={submitForm} login={fetchUser}/>
            
            <div className="form-content">
            <form className="form" onSubmit={handleSubmit} noValidate>
                <h1>Log In</h1>
            
            <div className="form-inputs">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" 
                    name="username" 
                    className="form-input" 
                    placeholder="Enter Username"
                    id="username"
                    value={values.username}
                    onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>}
            </div>
            <div className="form-inputs">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" 
                    name="password" 
                    className="form-input" 
                    placeholder="Enter Password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>}
            </div>
            <button className="form-input-btn" type="submit">Sign In</button>
            
            <span className="form-input-login">Don't have an account? 
                <Link to={`${url}/sign-up`}> Sign up here </Link>
                {/* <button className="form-change-btn" onClick={changeForm}>Sign Up</button> here */}
            </span>
            </form>
        </div>
        </div>
        </>
    )
}

export default Form

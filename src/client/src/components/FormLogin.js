import React from 'react'
import useForm from './useForm'
import validate from './validateInfo';
import {Link } from 'react-router-dom';
import "../css/Form.css"

const FormLogin = ({submitForm, login, changeForm, url}) => {
    const{handleChange, values, handleSubmit, errors} = useForm(submitForm, validate, login);

    /* Basic sigin form with 2 input fields */

    return (
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
    )
}

export default FormLogin

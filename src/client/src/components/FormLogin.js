import React from 'react'
import useForm from './useForm'
import validate from './validateInfo';
import "../css/Form.css"

const FormSignup = (submitForm) => {
    const{handleChange, values, handleSubmit, errors} = useForm(submitForm, validate);

    /* Basic signup form with 2 input fields */

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
            {/* <span className="form-input-login"></span> */}
            </form>
        </div>
    )
}

export default FormSignup

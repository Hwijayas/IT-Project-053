import React from 'react'
import useForm from './useForm'
import validate from './validateInfo';
import "../css/Form.css"

//user registr component
const FormRegister = ({submitForm, changeForm, FormState, register}) => {
    const{handleChange, values, handleSubmit, errors} = useForm(submitForm, validate, FormState, register);
    //const {url} = useRouteMatch();
    


    return (
        <div className="form-content">
            <form className="form" onSubmit={handleSubmit} noValidate>
                <h1>Signup</h1>

            <div className="form-inputs">
                <label htmlFor="email" className="form-label">Email</label>
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
                <label htmlFor="username" className="form-label">First Name</label>
                <input type="text" 
                    name="first-name" 
                    className="form-input" 
                    placeholder="Enter First Name"
                    id="first-name"
                    value={values.firstName}
                    onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>}
            </div>

            <div className="form-inputs">
                <label htmlFor="username" className="form-label">Last Name</label>
                <input type="text" 
                    name="last-name" 
                    className="form-input" 
                    placeholder="Enter Last Name"
                    id="last-name"
                    value={values.lastName}
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

            <div className='form-inputs'>
                <label className='form-label'>Confirm Password</label>
                <input
                    className='form-input'
                    type='password'
                    name='password2'
                    placeholder='Confirm your password'
                    value={values.password2}
                    onChange={handleChange}/>
                    {errors.password2 && <p>{errors.password2}</p>}
            </div>

            <button className="form-input-btn" type="submit">Sign Up</button>
            <span className="form-input-login">Already have an account? 
                <button onClick={changeForm}>Log in</button> here
            </span>
            
            </form>
        </div>
    )
}

export default FormRegister
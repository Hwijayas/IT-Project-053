import React from 'react'
import useForm from './useForm'
import validate from './validateInfo';
import {Link} from "react-router-dom";
import "../../css/Form.css"

//user registr component
const FormRegister = ({submitForm, login}) => {
    const{handleChange, values, handleSubmit, errors} = useForm(submitForm, validate);
    //const {url} = useRouteMatch();
    


    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit} noValidate>
                <h1>Signup</h1>

            <div className="form-inputs">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" 
                    name="username" 
                    className="form-input" 
                    placeholder="Enter Username"
                    id="username"
                    value={values.email}
                    onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>}
            </div>
            
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

            <button className="form-input-btn" type="submit">Sign In</button>
            {/* <span className="form-input-login"></span> */}
            {/* <Link to={"/login"}><button onClick={props.changeState}>
              Log in
            </button>
            </Link> */}
            </form>
        </div>
    )
}

export default FormRegister
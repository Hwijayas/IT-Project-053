//Login Component

import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
    return (
        <>
       <div className="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 className="text-center">Log in</h2>   
        <div className="form-group">
        	<div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <span><i className="zmdi zmdi-account"></i></span>
                    </span>                    
                </div>
                <input type="text" className="form-control" name="username" placeholder="Username" required="required" autoComplete="off"/>				
            </div>
        </div>
		<div className="form-group">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                    <i className="zmdi zmdi-lock"></i>
                    </span>                    
                </div>
                <input type="password" className="form-control" name="password" placeholder="Password" required="required"/>				
            </div>
        </div>        
        <div className="form-group my-3">
            <button type="submit" className="btn btn-primary login-btn btn-block">Log in</button>
        </div>
        <div className="clearfix">
            <label className="float-left form-check-label"><input type="checkbox"/> Remember me</label>
            <NavLink to="#" className="ms-2">Forgot Password?</NavLink>
        </div>
    </form>
    <p className="text-center text-muted small">Don't have an account? <NavLink to="/register">Register here!</NavLink></p>
</div>
        </>
    )
}

export default Login
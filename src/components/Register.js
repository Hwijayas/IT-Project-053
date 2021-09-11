//Register

import React from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <div className="signup-form">
                <form action="/examples/actions/confirmation.php" method="post" />
                <h2>Sign Up</h2>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <span><i className="zmdi zmdi-account"></i></span>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="username" placeholder="Username" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="zmdi zmdi-email"></i>
                            </span>
                        </div>
                        <input type="email" className="form-control" name="email" placeholder="Email Address" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="zmdi zmdi-phone"></i>
                            </span>
                        </div>
                        <input type="number" className="form-control" name="mobile" placeholder="Phone Number" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="zmdi zmdi-markunread-mailbox"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="work" placeholder="Your Profession" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="zmdi zmdi-lock"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="password" placeholder="Password" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="zmdi zmdi-lock"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="cpassword" placeholder="Confirm Password" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-check-label"><input type="checkbox" required="required" /> I accept the <NavLink to="#">Terms of Use</NavLink> &amp; <NavLink to="#">Privacy Policy</NavLink></label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                </div>

                <div className="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>

            </div>
        </>
    )
}

export default Register

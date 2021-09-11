//Contact

import React from 'react'

const Contact = () => {
    return (
        <>
            <div className="contact-form">
                <form action="" method="post" />
                <h2 className="">Write To Us</h2>
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
                            <i class="zmdi zmdi-pin-drop"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="location" placeholder="location" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i class="zmdi zmdi-comments"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="message" placeholder="message" required="required" autoComplete="off" />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div>

            </div>
        </>
    )
}

export default Contact

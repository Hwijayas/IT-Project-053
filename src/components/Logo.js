//Logo

import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../images/Union.svg'

//Here we set it up logo
const Logo = () => {
    return (
            <>
                <figure className="p-0 m-0 mb-2">
                    <img className="dashboard-logo" src={logo} alt="" srcset="" />
                </figure>
            </>

    )
}

export default Logo

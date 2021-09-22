//Nav Sidebar Component

import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'

//Sidebar links
const Navbar = () => {
    return (
        <>
            <div className="container p-0 m-0">
                <nav className="navbar navbar-expand d-flex flex-column align-item-start float-start" id="sidebar">
                    <ul className="navbar-nav d-flex flex-column mt-5 w-100">
                        <NavLink className="nav-link text-light" to="/"><i className="zmdi zmdi-face fs-1"></i></NavLink>
                        <p className="text-white mb-5">Username</p>
                        <NavLink className="nav-link text-light pb-4" to="/"><i className="zmdi zmdi-home fs-1"></i></NavLink>
                        <NavLink className="nav-link text-light pb-4" to="/graph"><i className="zmdi zmdi-chart fs-1"></i></NavLink>
                        <NavLink className="nav-link text-light pb-4" to="/contact"><i className="zmdi zmdi-phone fs-1"></i></NavLink>
                        <NavLink className="nav-link text-light pb-4" to="/settings"><i className="zmdi zmdi-settings fs-1"></i></NavLink>
                    </ul>
                </nav>
            </div>
            
        </>
    )
}

export default Navbar

import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavElements";
import { Redirect } from "react-router";
const Navbar = (props) => {
    
    return (
        <>
           <Nav>
            <NavLogo to="/">
                BitsRm
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/" activeStyle>
                    Home
                </NavLink>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/contact" activeStyle>
                    Contact
                </NavLink>
                {props.loggedin ?
                    (<>
                    <NavBtn>
                        <NavBtnLink to="/" onClick={props.handleLogout}>Sign Out</NavBtnLink>                
                    </NavBtn>
                    </>)
                    :
                    (<>
                        <NavBtn>
                            <NavBtnLink to="/login" onClick={props.handleOpen}>Sign In</NavBtnLink>                
                            <NavBtnLink to="/sign-up" onClick={props.handleOpen}>Sign Up</NavBtnLink>                
                        </NavBtn>
                        </>)
                }
            </NavMenu> 
           </Nav> 
        </>
    );
};
export default Navbar;
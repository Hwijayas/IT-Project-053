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
import {Button} from '@mui/material';

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
                <NavLink to="/deals" activeStyle>
                    About
                </NavLink>
                <NavLink to="/modal" activeStyle>
                    Contact
                </NavLink>
                {props.loggedIn ?
                    (<>
                    <Button variant='contained' color='info' onClick={props.handleLogout}>Log Out</Button>
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
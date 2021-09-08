import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const token = localStorage.getItem('token');
    if(!token){
        return( <Redirect to='/login'/> );
    }
    let args = {
        method: 'GET',
        headers:{
            Authorization: token,
            'Content-Type': 'application/json',
        },
    };
    const authResponse = false;
    fetch(authUrl, args).then(res => res.json()).then(json =>{
        if(json.success){ authResponse=true;}
    }).catch(err => console.log(err.message));

    return (
        <Route
        {...restOfProps}
        render={(props) =>
            authResponse ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
}

export default ProtectedRoute;
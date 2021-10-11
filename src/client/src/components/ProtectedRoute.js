import React from "react";
import { Redirect, Route } from "react-router-dom";
import {useSelector} from 'react-redux'
function ProtectedRoute({ component: Component, ...restOfProps }) {
    const userReducer = useSelector(state=>state.userReducer)
    const loggedIn = userReducer.loggedIn;
    return (
        <Route
        render={() =>
            loggedIn ? <Component {...restOfProps} /> : <Redirect to="/login" />
        }
        />
    );
}
function PublicRoute({ component: Component, ...restOfProps }) {
    const userReducer = useSelector(state=>state.userReducer)
    const loggedIn = userReducer.loggedIn;
    return (
        <Route
        render={() =>
            !loggedIn ? <Component {...restOfProps} /> : <Redirect to="/" />
        }
        />
    );
}
function AdminRoute({ component: Component, ...restOfProps }) {
    const userReducer = useSelector(state=>state.userReducer)
    const isAdmin = userReducer.loggedIn && userReducer.isAdmin;
    return (
        <Route
        render={() =>
            !isAdmin ? <Component {...restOfProps} /> : <Redirect to="/" />
        }
        />
    );
}
export  {ProtectedRoute, PublicRoute, AdminRoute};
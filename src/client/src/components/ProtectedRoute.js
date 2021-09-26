import React from "react";
import { Redirect, Route } from "react-router-dom";
function ProtectedRoute({ component: Component, loggedIn, ...restOfProps }) {
    return (
        <Route
        render={() =>
            loggedIn ? <Component {...restOfProps} /> : <Redirect to="/login" />
        }
        />
    );
}
function PublicRoute({ component: Component, loggedIn, ...restOfProps }) {
    return (
        <Route
        render={() =>
            !loggedIn ? <Component {...restOfProps} /> : <Redirect to="/" />
        }
        />
    );
}
export  {ProtectedRoute, PublicRoute};
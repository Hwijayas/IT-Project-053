import React from "react";
import { Redirect, Route } from "react-router-dom";
import {isLoggedIn} from "./Auth";
function ProtectedRoute({ component: Component, ...restOfProps }) {
    let isAuthorized = isLoggedIn();
    return (
        <Route
        {...restOfProps}
        render={(props) =>
            isAuthorized ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
}

export default ProtectedRoute;
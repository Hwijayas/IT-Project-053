import React from "react";
import { Redirect, Route } from "react-router-dom";
function ProtectedRoute({ component: Component, ...restOfProps }) {
    return (
        <Route
        {...restOfProps}
        render={(props) =>
            props.loggedin ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
}

export default ProtectedRoute;
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../adalconfig";

export default ({ path: P, component: C, props: cProps, ...rest }) => {
    
    let isLoggedIn = getToken();

    return (

        !isLoggedIn
            ? <Route path={P} component={C} />
            : <Redirect to="/profile" />
    );
};
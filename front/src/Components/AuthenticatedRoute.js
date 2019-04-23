import React from 'react'
import { Route, Redirect } from "react-router-dom";
import {getToken} from '../adalconfig';

  export function AuthenticatedRoute ({ component: Component, props: P, ...rest }) {
    let props =  {...rest};
    let isLoggedIn = getToken();
    //let isLoggedIn = P.isAuthenticated;

    console.log("AuthenticatedRoute.js, P: ", P.role);
    
    return (
        isLoggedIn ?
        <Route path={props.path} component={Component} role={P.role} />
        :
        <Redirect to={{pathname : "/login", state: {from: props.location} }} />
    )
    }
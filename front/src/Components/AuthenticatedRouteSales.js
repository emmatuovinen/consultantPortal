import React from 'react'
import { Route, Redirect } from "react-router-dom";
import {getToken} from '../adalconfig';

  export function  AuthenticatedRouteSales ({ component: Component, props: P, ...rest }) {
    let props =  {...rest};
    let isLoggedIn = getToken();
  
    console.log("p on j", P)
    
    return (
        isLoggedIn 
        ?
        <Route path={props.path} component={Component} />
        :
        <Redirect to={{pathname : "/login", state: {from: props.location} }} />
    )
    }
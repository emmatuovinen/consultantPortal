import React from 'react'
import { Route, Redirect } from "react-router-dom";
import {getToken} from '../adalconfig';

  export function AuthenticatedRoute ({ component: Component, ...rest }) {
      console.log("PrivateRoute component");
    let props =  {...rest};
    let isLoggedIn = getToken();
    console.log("privateRouten propsit: ", props );
    
    return (
        isLoggedIn ?
        <Route path={props.path} component={Component} />
        :
        <Redirect to={{pathname : "/login", state: {from: props.location} }} />
    )
    }
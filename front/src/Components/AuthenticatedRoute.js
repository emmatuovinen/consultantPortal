import React from 'react'
import { Route, Redirect } from "react-router-dom";
import {getToken} from '../adalconfig';

  export function AuthenticatedRoute ({ component: Component, props: P, ...rest }) {
    let props =  {...rest};
    let isLoggedIn = getToken();
 
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn
          ? <Component {...props} {...P} />
          : <Redirect to={{pathname : "/login", state: {from: props.location} }} />
        }
      />)
    }
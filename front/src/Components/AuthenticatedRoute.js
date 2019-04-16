import React, { Component } from 'react';

export default ({ component: C, props: cProps, ...rest }) =>
<Route
    {...rest}
    render={props =>
        cProps.isAuthenticated
            ? <C {...props} {...cProps} />
            : <Redirect
                to={`/login?redirect=${props.location.pathname}${props.location.search}`}
            />}
/>;
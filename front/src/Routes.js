import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "./history";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import UnauthenticatedRoute from "./Components/UnauthenticatedRoute";
import Login from "./Views/Login";
import Home from "./Views/Home";
import ProfileView from "./Views/ProfileView";
import ConsultantSkillsAutoSuggestions from "./Containers/ConsultantSkillsAutoSuggestions";
import ViewNonEditableProfile from "./Containers/ViewNonEditableProfile";
import PositionsList from "./Containers/PositionsList";
import PositionSelection from "./Containers/PositionSelection";
import AddNewPosition from "./Containers/AddNewPosition";

export default class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const childProps = {
            isAuthenticated: this.props.isAuthenticated,
            role: this.props.role
        }

        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <UnauthenticatedRoute
                        path="/" exact
                        component={Login}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        exact path="/positions"
                        component={PositionsList}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/position-details/:positionId"
                        component={PositionSelection}
                        name="position-details"
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/positions/add"
                        component={AddNewPosition}
                        props={childProps}    
                    />
                    <AuthenticatedRoute
                        path="/auto-suggest"
                        component={ConsultantSkillsAutoSuggestions}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/profile"
                        component={ProfileView}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/view-profile/:id"
                        component={ViewNonEditableProfile}
                        name="view-profile"
                        props={childProps}
                    />
                </Switch>
            </Router>
        )
    }
}
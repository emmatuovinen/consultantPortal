import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "./history";
import { AuthenticatedRoute } from "./Components/AuthenticatedRoute";
import Home from "./Views/Home";
import ProfileView from "./Views/ProfileView";
import ConsultantSkillsAutoSuggestions from "./Containers/ConsultantSkillsAutoSuggestions";
import ViewNonEditableProfile from "./Containers/ViewNonEditableProfile";
import PositionsList from "./Containers/PositionsList";
import PositionSelection from "./Containers/PositionSelection";
import AddNewPosition from "./Containers/AddNewPosition";
import Login from './Views/Login';
import ConsultantList from './Containers/ConsultantList';

export default class Routes extends Component {

    // Two props combined into one object for delivering those to different routes
    render() {
        const childProps = {
            isAuthenticated: this.props.isAuthenticated,
            role: this.props.role
        }
        
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" render={(props) => (<Login {...props} />)} />
                    <AuthenticatedRoute
                        exact path="/"
                        component={Home}
                        props={this.props.isAuthenticated}
                    />
                    {/* This route renders a list of all positions */}
                    <AuthenticatedRoute
                        exact path="/positions"
                        component={PositionsList}
                        props={this.props.isAuthenticated}
                    />
                    {/* This route renders a list of all consultants */}
                    <AuthenticatedRoute
                        exact path="/consultants"
                        component={ConsultantList}
                        props={this.props.isAuthenticated}
                    />
                    <AuthenticatedRoute
                        path="/position-details/:positionId"
                        exact component={PositionSelection}
                        name="position-details"
                        props={this.props.isAuthenticated}
                    />
                    {/* This route renders a form for adding a new position, accessible only by Sales/AMs */}
                    <AuthenticatedRoute
                       exact path="/positions/add"
                        component={AddNewPosition}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/auto-suggest"
                        exact component={ConsultantSkillsAutoSuggestions}
                        props={this.props.isAuthenticated}
                    />
                    <AuthenticatedRoute
                        path="/profile"
                        exact component={ProfileView}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/view-profile/:id"
                        exact component={ViewNonEditableProfile}
                        name="view-profile"
                        props={this.props.isAuthenticated}
                    />
                </Switch>
            </Router>
        )
    }
}
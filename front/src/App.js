import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Views/Home";
import history from "./history";
import ProfileView from "./Views/ProfileView";
import ConsultantSkillsAutoSuggestions from "./Containers/ConsultantSkillsAutoSuggestions";
import ViewNonEditableProfile from "./Containers/ViewNonEditableProfile";
import NavigationBar from "./Containers/NavigationBar";
import PositionsList from "./Containers/PositionsList";
import PositionSelection from "./Containers/PositionSelection";
import AddNewPosition from "./Containers/AddNewPosition";
import { runWithAdal } from 'react-adal';
import { authContext } from './adalconfig';
import { Button} from "reactstrap";
import { adalApiFetch, getToken } from './adalconfig'


class App extends Component {

  state = {
    userRole: '',
    hasAuthenticated: false
  }

  componentDidMount() {
    if (getToken()) {
      this.setState({hasAuthenticated: true});
      adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me/memberOf', {})
      .then((response) => {
        response.json()
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({ userRole: responseJson.value[0].displayName });
          });
      })
      .catch((error) => {
        console.error(error);
      })

    }
       
  }
  login = () => {
    const DO_NOT_LOGIN = false;
    
    
    runWithAdal(authContext, () => {
      
      // eslint-disable-next-line
      require('./App.js');
      
    }, DO_NOT_LOGIN);
  }
  logout() {
    authContext.logOut()
  }
  render() {
    console.log("auth", this.state.hasAuthenticated);
    console.log("user", this.state.userRole);
    return (
      <div>
            

        {/* <NavigationBar userRole={this.state.userRole} /> */}
        {this.state.hasAuthenticated 
        ? <Button onClick={this.logout}>Log out</Button>
        : <Button onClick={this.login}>Kirjaudu</Button> }
        
      
        {/* <Router history={history}>
          <Switch>
            <Route path="/profile" component={ProfileView} />
            <Route
              path="/view-profile/:id"
              component={ViewNonEditableProfile}
              name="view-profile"
            />
            <Route
              path="/position-details/:positionId"
              component={PositionSelection}
              name="position-details"
            />
            <Route exact path="/positions" component={PositionsList} />
            <Route
              path="/auto-suggest"
              component={ConsultantSkillsAutoSuggestions}
            />
            <Route path="/positions/add" component={AddNewPosition} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router> */}

      </div>
      
    );
  }
}

export default App;
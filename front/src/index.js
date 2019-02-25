import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './Views/Home';
import * as serviceWorker from './serviceWorker';
import history from './history';
import ProfileView from './Views/ProfileView';
import ConsultantSkillsAutoSuggestions from './Containers/ConsultantSkillsAutoSuggestions';
import ViewNonEditableProfile from './Containers/ViewNonEditableProfile';
import NavigationBar from './Containers/NavigationBar';
import PositionsList from './Containers/PositionsList';
import PositionSelection from './Containers/PositionSelection';
import PositionForm from './Components/PositionForm';
import AddNewPosition from './Containers/AddNewPosition';

ReactDOM.render(
    <div>
        <NavigationBar />
        <Router history={history}>
            <Switch>
                <Route path='/profile' component={ProfileView} />
                <Route path='/view-profile/:id' component={ViewNonEditableProfile} name='view-profile' />
                <Route path='/position-details/:positionId' component={PositionSelection} name='position-details' />
                <Route exact path='/positions' component={PositionsList} />
                <Route path='/auto-suggest' component={ConsultantSkillsAutoSuggestions} />
                <Route path='/positions/add' component={AddNewPosition} />
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
    </div>,
    document.getElementById('root'));

serviceWorker.unregister();

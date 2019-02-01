import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './Views/Home';
import * as serviceWorker from './serviceWorker';
import history from './history';
import ProfileView from './Views/ProfileView';
import NavigationBar from './Containers/NavigationBar';

ReactDOM.render(
    <div>
        <NavigationBar />
        <Router history={history}>
            <Switch>
                <Route path='/profile' component={ProfileView} />
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
    </div>,
    document.getElementById('root'));

serviceWorker.unregister();

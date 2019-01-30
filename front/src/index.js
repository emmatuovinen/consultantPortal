import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './Views/Home';
import * as serviceWorker from './serviceWorker';
import history from './history';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={Home} />
        </Switch>
    </Router>,
    document.getElementById('root'));

serviceWorker.unregister();

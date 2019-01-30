import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={App} />
        </Switch>
    </Router>,
    document.getElementById('root'));

serviceWorker.unregister();

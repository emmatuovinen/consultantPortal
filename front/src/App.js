import React, { Component } from 'react';
import './App.css';

import Users from './Components/Users'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App.js</h1>
        <Users />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import Users from './Components/Users'
import NavigationBar from './Components/NavigationBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar/>
        <Users />
      </div>
    );
  }
}

export default App;

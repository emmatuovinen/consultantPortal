import React, { Component } from 'react';

import Users from '../Containers/Users'
import NavigationBar from '../Containers/NavigationBar';

class Home extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Users />
            </div>
        );
    }
}

export default Home;
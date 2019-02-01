import React, { Component } from 'react';

import ConsultantList from '../Containers/ConsultantList'
import NavigationBar from '../Containers/NavigationBar';

class Home extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <ConsultantList />
            </div>
        );
    }
}

export default Home;
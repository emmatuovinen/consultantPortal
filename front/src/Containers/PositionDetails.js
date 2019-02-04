import React, { Component } from 'react';
import { GetPositionInfo } from '../serviceClients/PositionService';

class PositionDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            positionId: "", 
            position: {
                positionDescription:"",
                positionRole:"",
                location:"",
                isActive: true
            }
        }
    }

    componentDidMount= () => {
        GetPositionInfo(this.props.positionId, response => {
            if(response.status === 200) {
                let position = response.data;
                this.setState({position})
            } else {
                console.log("Error: " + response.status);
            }
        })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default PositionDetails;
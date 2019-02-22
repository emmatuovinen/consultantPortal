import React, { Component } from 'react';
import PositionForm from '../Components/PositionForm';
import { CreatePosition } from '../serviceClients/PositionService';

class AddNewPosition extends Component {

    state = {
        position: {
            company: "",
            positionDescription: "",
            positionRole: "",
            location: "",
            positionStatus: "",
            positionSkills: [],
            isActive: true
        },
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let position = { ...this.state.position }
        let tmpArr = position.positionSkills.toString().split(",");
        position.skills = tmpArr;

        CreatePosition(position, response => {
            if (response.status === 200 || response.status === 201) {
                alert("Position saved")
            } else {
                console.log("Error, response.status: ", response.status)
            }
        });
    };

    handleChange = e => {
        const field = e.target.id;
        const value = e.target.value;
        let copyOfPosition = { ...this.state.position }
        copyOfPosition[field] = value;

        this.setState({
            position: copyOfPosition,
        });
    }

    render() {
        return (
            <PositionForm
                position={this.state.position}
                handleChange={this.handleChange}
                onButtonClick={this.handleSubmit}
                isEditing={true}
            />
        );
    }
}

export default AddNewPosition;
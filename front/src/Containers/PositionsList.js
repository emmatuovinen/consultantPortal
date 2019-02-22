import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";
import { Container, Button, Row } from "reactstrap";
import PositionForm from "../Components/PositionForm";
import { CreatePosition } from "../serviceClients/PositionService";
import PositionFilter from "./PositionFilter";


class PositionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        company: '',
        positionDescription: '',
        positionRole: '',
        location: '',
        isActive: true,
        positionStatus: '',
        positionSkills: [],
      },
      positions: [],
      positionIsActive: true,
      onlyActivePositions: true,
      addPosition: false,
      filteredPositions: []
    };
  }

  componentDidMount() {
    GetAllPositions(response => {
      if (response.status === 200) {
        let allPositions = response.data;
        this.setState({ positions: allPositions, filteredPositions: allPositions });
      } else {
        console.log("Error, response.status: " + response.status);
      }
    });
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
    const id = e.target.id;
    const value = e.target.value;
    let change = { ...this.state.position }
    change[id] = value;

    this.setState({
      position: change,
    });
  }

  handleAddPosition = () => {
    this.setState({ addPosition: !this.state.addPosition })
  };

  renderPositionFilter = () => {
    if (this.state.positions.length > 0) {
      return <PositionFilter positions={this.state.filteredPositions} />;
    }
  };

  renderPositionForm = () => {
    if (this.state.addPosition) {
      return <PositionForm position={this.state.position} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    }
  };

  render() {
    return (
      <Container>
          {this.renderPositionForm()}
          {this.renderPositionFilter()}
      </Container>
    );
  }
}

export default PositionsList;

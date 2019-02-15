import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";
import { Container, Button } from "reactstrap";
import PositionCard from "../Components/PositionCard";
import PositionSearchBar from "./PositionSearchBar";
import PositionForm from "../Components/PositionForm";
import {CreatePosition} from "../serviceClients/PositionService";

class PositionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        companyName: '',
        positionDescription: '',
        positionRole: '',
        location: '',
        isActive:true,
        status: '',
        skills: [],
      },
      positions: [],
      positionIsActive: true,
      onlyActivePositions: true,
      addPosition: false,
      filteredPositions: []
    };
  }

  componentDidMount = () => {
    GetAllPositions(response => {
      if (response.status === 200) {
        let allPositions = response.data;
        this.setState({ positions: allPositions, filteredPositions: allPositions });
      } else {
        console.log("Error, response.status: " + response.status);
      }
    });
  };

  handleClick = () => {
    this.setState({ onlyActivePositions: !this.state.onlyActivePositions });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit", e);

  }

  handleChange = e => {
    console.log("handleChange", e)
    let change = {}
    change[e.target.id] = e.target.value
    this.setState({ position: change });
  }

  handleAddPosition = () => {
    console.log("Edit nappulassa")
    this.setState({addPosition: !this.state.addPosition})
  };

  renderActivePositions = () => {
    let activePositions = this.state.positions.map((position, index) => {
      if (position.isActive) {
        return (
          <PositionCard
            key={index}
            positionId={position.positionId}
            description={position.positionDescription}
            role={position.positionRole}
            location={position.location}
            active={position.isActive}
            company={position.company}
          />
        );
      } else {
        return "";
      }
    });
    return activePositions.length > 0 ? (
      <Container>{activePositions} </Container>
    ) : (
        <Container>
          <p>Sorry, no active positions.</p>
        </Container>
      );
  };

  renderAllPositions = () => {
    let positionsList = this.state.positions.map((position, index) => {
      return (
        <PositionCard
          key={index}
          positionId={position.positionId}
          description={position.positionDescription}
          role={position.positionRole}
          location={position.location}
          active={position.isActive}
        />
      );
    });
    return <Container>{positionsList}</Container>;
  };

  renderSearchBar = () => {
    if (this.state.positions.length > 0) {
      return <PositionSearchBar positions={this.state.positions} filteredPositions={this.filterPositions} />;
    }
  };

  renderPositionForm = () => {
    console.log("renderposition:")
    if(this.state.addPosition){
      return <PositionForm position={this.state.position} handleChange={this.handleChange}/>
    }
    
  };

  render() {
    let btnText = this.state.onlyActivePositions
      ? "Show all positions"
      : "Show only active positions";
    return (
      <Container>
        {this.renderSearchBar()}
        <Button
          color="success"
          onClick={this.handleClick}
          style={{ margin: "0.5em" }}
        >
          {btnText}
        </Button>
        <Button
        color="success"
        onClick={this.handleAddPosition}
        style={{ margin: "0.5em" }}
        >
          Add new position
        </Button>
        {this.renderPositionForm()}
        {this.state.onlyActivePositions
          ? this.renderActivePositions()
          : this.renderAllPositions()}
      </Container>
    );
  }
}

export default PositionsList;

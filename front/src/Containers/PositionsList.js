import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";
import { Container, Button } from "reactstrap";
import PositionCard from "../Components/PositionCard";
import PositionForm from "../Components/PositionForm";
import {CreatePosition} from "../serviceClients/PositionService";
import PositionFilter from "./PositionFilter";


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
    let position = {...this.state.position};
    console.log("position", position);
    CreatePosition((position, response) => {
      console.log("status: ", response.status)

    })
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

 

  renderPositionFilter = () => {
    if (this.state.positions.length > 0) {
      return <PositionFilter positions={this.state.filteredPositions}  />;
    }
  };

  renderPositionForm = () => {
    console.log("renderposition:")
    if(this.state.addPosition){
      return <PositionForm position={this.state.position} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    }
    
  };

  render() {
    return (
      
    <Container>        
        <Button
        color="success"
        onClick={this.handleAddPosition}
        style={{ margin: "0.5em" }}
        >
          Add new position
        </Button>
        {this.renderPositionForm()}    
        {this.renderPositionFilter()}
      </Container>
    );
  }
}

export default PositionsList;

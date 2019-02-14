import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import {Container, Button, Row} from "reactstrap";
import PositionCard from "../Components/PositionCard";
 
const KEYS_TO_FILTERS = ['positionRole', 'company', 'location'];

export default class PositionFilter extends Component {
    constructor (props) {
        super(props)
        this.state = {
            searchTerm: '',
            positions: this.props.positions, 
            positionFilter: "",
            onlyActivePositions: true
        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }
    
    searchUpdated (term) {
      this.setState({searchTerm: term})
      // this.props.onChange(term.target.value)
    }

    handleClick = () => {
      this.setState({ onlyActivePositions: !this.state.onlyActivePositions });
    };

    renderActivePositions = (positions) => {
      let activePositions = positions.map((position, index) => {
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
  
    renderAllPositions = (positions) => {
      let positionsList = positions.map((position, index) => {
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

    render () {
     
    let filteredPositions = this.state.positions.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    let btnText = this.state.onlyActivePositions
      ? "Show all positions"
      : "Show only active positions";
    
    return (
      <div>
        <Row>
        <Button
          color="secondary"
          onClick={this.handleClick}
          style={{ margin: "0.5em" }}
        >
          {btnText}
        </Button>
        <SearchInput className="search-input" onChange={this.searchUpdated}  />
        </Row>
        <div>           
            {this.state.onlyActivePositions
          ? this.renderActivePositions(filteredPositions)
          : this.renderAllPositions(filteredPositions)}        
            </div>   
      </div>
    )
  }
 
}

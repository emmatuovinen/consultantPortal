import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
 
// import emails from './mails'
 
const KEYS_TO_FILTERS = ['positionRole'];

export default class PositionSearchBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            searchTerm: '',
            filteredPositions: []
        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }
    
    // filterPositions = () => {
    //     this.props.filterPositions(this.)
    // }

    // componentDidMount() {
    // }
    
    
    render () {
    const positions = this.props.positions;  
    console.log("posset: ", positions)
    const filteredPositions = positions.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    
 
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredPositions.map(position => {
            this.state.filteredPositions.push(position);
            console.log("terve",this.state.filteredPositions)
          return (
            <div className="mail" key={position.id}>    
            {/* {position.positionRole}    */}
            </div>
          )
        })}
      </div>
    )
  }
 
  searchUpdated (term) {
    this.setState({searchTerm: term})
    
  }
}

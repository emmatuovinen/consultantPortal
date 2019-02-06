import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import Autosuggest from 'react-autosuggest';

import { GetTechStackOptions } from '../serviceClients/TechStackService';

export default class AutoSuggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            techStackOptions: [],
            value: '',
            suggestions: []
        };
    }

    componentDidMount() {
        GetTechStackOptions(response => {
            if (response.status === 200) {
                response.data.map(techStackItem => {
                    this.state.techStackOptions.push(techStackItem);
                });
            } else {
                console.log('error', response.status);
                // redirect to an error page?
            }
        });
        console.log(this.state.techStackOptions)
    }
    
    getSuggestionValue = suggestion => suggestion.tech;
    
    onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: this.getSuggestions(value) });
    };
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ?
            [] : this.state.techStackOptions.filter(techItem => techItem.tech.toLowerCase().slice(0, inputLength) === inputValue);
    };

    renderSuggestion = (techSuggestion) => (
        <h5>
            <Badge name='techStack' id='techStack' value={techSuggestion.tech} onClick={this.props.handleChange}>
                {techSuggestion.tech}
            </Badge>
        </h5>
    );

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [], value: '' });
    };

    render() {
        const inputProps = { placeholder: 'Search', value: this.state.value, onChange: this.onChange };

        return (
            <div>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    theme={theme} // theme={the css setting can be added as const here}
                />
            </div>
        );
    }
}

// FOR DEMO PURPOSES
const theme = {
    container: {
      position: 'relative'
    },
    input: {
      width: '100%',
      height: 'calc(2.25rem + 2px)',
      padding: '10px 20px',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      fontSize: 16,
      border: '1px solid #ced4da',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    inputFocused: {
      outline: 'none'
    },
    inputOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    suggestionsContainer: {
      display: 'none'
    },
    suggestionsContainerOpen: {
      display: 'block',
      position: 'absolute',
      top: 51,
      width: 280,
      border: '1px solid #aaa',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      fontSize: 16,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      zIndex: 2
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    suggestion: {
      cursor: 'pointer',
      padding: '10px 20px'
    },
    suggestionHighlighted: {
      backgroundColor: '#ddd'
    }
  };
  
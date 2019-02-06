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
                // theme={the css setting can be added as const here}
                />
            </div>
        );
    }
}
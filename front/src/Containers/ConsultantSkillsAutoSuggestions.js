import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

import { GetSkillsStackOptions } from "../serviceClients/ConsultantSkillsService";

export default class ConsultantSkillsAutoSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsStackOptions: [],
      value: "",
      suggestions: []
    };
  }

  componentDidMount() {
    GetSkillsStackOptions(response => {
      if (response.status === 200) {
        response.data.map(skillsStackItem =>
          this.state.skillsStackOptions.push(skillsStackItem)
        );
      } else {
        console.log("error", response.status);
        // redirect to an error page?
      }
    });
  }

  getSuggestionValue = suggestion => suggestion.skill;

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: this.getSuggestions(value) });
  };
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : this.state.skillsStackOptions.filter(
          skillItem =>
            skillItem.skill.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  renderSuggestion = suggestion => (
    <div
      name="userSkills"
      id="userSkills"
      value={suggestion.skill}
      onClick={this.props.handleChange}
    >
      {suggestion.skill}
    </div>
  );

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [], value: "" });
  };

  render() {
    const inputProps = {
      placeholder: "Search",
      value: this.state.value,
      onChange: this.onChange
    };

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
    position: "relative"
  },
  input: {
    width: "100%",
    height: "calc(2.25rem + 2px)",
    padding: "10px 20px",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    border: "1px solid #02a781" /* rgb(57, 221, 165) */,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  inputFocused: {
    outline: "none"
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: "none"
  },
  suggestionsContainerOpen: {
    display: "block",
    position: "absolute",
    top: 51,
    width: 280,
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  suggestion: {
    cursor: "pointer",
    padding: "10px 20px"
  },
  suggestionHighlighted: {
    backgroundColor: "#ddd"
  }
};

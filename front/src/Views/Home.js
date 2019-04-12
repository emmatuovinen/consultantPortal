import React, { Component } from "react";
import ConsultantList from "../Containers/ConsultantList";
import {adalApiFetch} from '../adalconfig'

class Home extends Component {
  state = {
    apiResponse: ''
  };
  componentDidMount() {

    // We're using Fetch as the method to be called, and the /me endpoint 
    // from Microsoft Graph as the REST API request to make.
    adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me/memberOf', {})
      .then((response) => {

        // This is where you deal with your API response. In this case, we            
        // interpret the response as JSON, and then call `setState` with the
        // pretty-printed JSON-stringified object.
        response.json()
          .then((responseJson) => {
            console.log(responseJson)
            console.log(responseJson.value)
            this.setState({ apiResponse: responseJson.value })
            console.log(this.state.apiResponse)
            console.log(this.state.apiResponse[0].displayName)
          });
      })
      .catch((error) => {

        // Don't forget to handle errors!
        console.error(error);
      })
  }


  render() {
  
    return (
      <div>      
        <ConsultantList />
       <p>{this.state.apiResponse.displayName}</p>
      </div>
    );
  }
}

export default Home;

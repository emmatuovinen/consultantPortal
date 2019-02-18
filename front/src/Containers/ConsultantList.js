import React, { Component } from "react";
import { Container } from "reactstrap";
import SearchInput, { createFilter } from "react-search-input";
import UserCard from "../Components/UserCard";
import { GetAllConsultants } from "../serviceClients/UserService";

const KEYS_TO_FILTERS = ["firstName", "lastName", "userSkills", "preferableRoles"];

class ConsultantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultants: [],
      searchTerm: '',
    };
  }

  componentDidMount = () => {
    GetAllConsultants(response => {
      if (response.status === 200) {
        let allConsultants = response.data;
        this.setState({ consultants: allConsultants });
      } else {
        console.log("Error, response status: " + response.status);
      }
    });
  };

  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }

  render() {
    let filteredConsultants = this.state.consultants.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    let consultantsListed = filteredConsultants.map(consultant => {
      return (
        <UserCard
          userId={consultant.userId}
          key={consultant.userId}
          firstName={consultant.firstName}
          lastName={consultant.lastName}
          role={consultant.role}
          userSkills={consultant.userSkills}
          preferableRoles={consultant.preferableRoles}
          description={consultant.description}
          phoneNumber={consultant.phoneNumber}
          email={consultant.email}
          pictureUrl={consultant.pictureUrl}
        />
      );
    });

    return (
      <Container>
        <SearchInput
          onChange={this.searchUpdated}
          className="search-input" />
        {consultantsListed}
      </Container>
    );
  }
}

export default ConsultantList;

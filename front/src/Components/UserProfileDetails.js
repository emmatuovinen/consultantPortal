import React from "react";
import { Label, Table, Col, Row } from "reactstrap";
import UserProfileConsultantDetails from "./UserProfileConsultantDetails";

const linkedInLogo = (
  <img
    alt="LinkedIn"
    height="32"
    width="32"
    src="http://funerariamontedelosolivos.com/wp-content/uploads/2015/08/linkedin-logo.png"
  />
);
const githubLogo = (
  <img
    alt="Github"
    height="32"
    width="32"
    src="https://d1zx8a944ras19.cloudfront.net/wp-content/uploads/2017/12/Octicons-mark-github.svg"
  />
);

const UserProfileDetails = props => {
  let user = props.user;
  let userLinkedinLink = user.linkedInUrl;
  let userGithubLink = user.gitHubUrl;

  return (
    <Row>
      <Col lg="2" />
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        {/* <p>{user.role}</p> */}
        <Col lg="9">
        <Row>
          <Col md="6" style={{ textAlign: "center" }}>
            <p>
              <img
                src={user.pictureUrl}
                alt={`${user.firstName} ${user.lastName}`}
                width="60%"
              />
            </p>
          </Col>
          <Col md="6">
            <p>{user.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Table>
              <tbody>
                <tr>
                  <th scope="row" style={{ width: "45%" }}>
                    <Label>Email:</Label>
                  </th>
                  <td style={{ width: "55%" }}>
                    <Label>{user.email}</Label>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label>Phone number: </Label>
                  </th>
                  <td>
                    <Label>{user.phoneNumber}</Label>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="6">
            <Table>
              <tbody>
                <tr>
                  <th scope="row">{linkedInLogo}</th>
                  <td>
                    <a href={userLinkedinLink}>{userLinkedinLink}</a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{githubLogo}</th>
                  <td>
                    <a href={userGithubLink}>{userGithubLink}</a>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {props.userIsConsultant && (
          <UserProfileConsultantDetails
            user={user}
            userIsConsultant={props.userIsConsultant}
          />
        )}
      </Col>
      <Col lg="1" />
    </Row>
  );
};

export default UserProfileDetails;

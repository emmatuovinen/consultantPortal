import React from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Badge } from "reactstrap";
import ConsultantSkillsAutoSuggestions from '../Containers/ConsultantSkillsAutoSuggestions';
import './Styles/PositionForm.css';
import '../Components/Styles/App.css';


const PositionForm = props => {
  let position = props.position;
  let button = "";
  if (!props.isEditing) {
    button = (
      <Button
        type="submit"
        outline                                                                                                                                
        color="success"
        onClick={props.handleSubmit}
        style={{ margin: "0.5em" }}
      >
        Submit
      </Button>
    );
  } else {                                                                                                       
    button = (
        <div className="save-button">
            <Row>
                <Col>
                    <Button
                        outline
                        color="success"
                        onClick={props.onButtonClick}
                        style={{ margin: "0.5em" }}
                        value="save"
                    >
                        Save
                    </Button>
                </Col>
            </Row>
        </div>
    );
  }
  return (
      <div className="add-position">
          <Row>
              <Col>
                  <h3 className= "h3-green-uppercase-top">Add new position</h3>
              </Col>
          </Row>
          <Row>
              <Col lg="1" />
              <Col lg="10">
                  <Form>
                      <FormGroup>
                          <Label for="company">Company</Label>
                          <Input
                              onChange={props.handleChange}
                              type="text"
                              name="company"
                              id="company"
                              value={position.company}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label for="positionDescription">Position description</Label>
                          <Input
                              onChange={props.handleChange}
                              type="text"
                              name="positionDescription"
                              id="positionDescription"
                              value={position.positionDescription}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label for="positionRole">Position role</Label>
                          <Input
                              onChange={props.handleChange}
                              type="text"
                              name="positionRole"
                              id="positionRole"
                              value={position.positionRole}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label for="location">Location</Label>
                          <Input
                              onChange={props.handleChange}
                              type="text"
                              name="location"
                              id="location"
                              value={position.location}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label for="positionStatus">Status</Label>
                          <Input
                              onChange={props.handleChange}
                              type="text"
                              name="positionStatus"
                              id="positionStatus"
                              value={position.positionStatus}
                          />
                      </FormGroup>
                      <FormGroup controlid="positionSkills">
                          <Label for="positionSkills">Skills</Label>
                          <ConsultantSkillsAutoSuggestions handleChange={props.handleChange} />
                          {props.position.positionSkills.map((skill, index) => { return <Badge key={index}>{skill}</Badge> })}
                      </FormGroup>
                      {button}
                  </Form>
              </Col>
          </Row>
      </div>
    );
  };

export default PositionForm;

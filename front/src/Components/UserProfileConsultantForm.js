import React from "react";
import { Form, FormGroup, Label, Input, Badge } from "reactstrap";
import ConsultantSkillsAutoSuggestions from "../Containers/ConsultantSkillsAutoSuggestions";


const UserProfileForm = props => {
  return (
    <Form>
      <FormGroup controlid="userSkills">
        <Label for="userSkills">Skills</Label>
        <ConsultantSkillsAutoSuggestions handleChange={props.handleChange} />
        {props.user.userSkills.map((skill, index) => {
          return <Badge key={index}>{skill}</Badge>;
        })}
      </FormGroup>
      <FormGroup controlid="roleInterests">
        <Label for="roleInterests">Role interests</Label>
        <Input
          onChange={props.handleChange}
          type="text"
          name="roleInterests"
          id="roleInterests"
          value={props.user.preferableRoles}
        />
      </FormGroup>
    </Form>
  );
};

export default UserProfileForm;

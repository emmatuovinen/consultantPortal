import React from 'react';
import { Form, FormGroup, Label, Input, Badge } from 'reactstrap';

import ConsultantSkillsAutoSuggestions from '../Containers/ConsultantSkillsAutoSuggestions';

// HARD CODED FOR DEMO PURPOSES
const ROLE_INTERESTS = ["Front-end", "Back-end", "DevOps"];
const LESS_PREFERABLE_ROLES = ["Project manager", "Scrum Master"];

const UserProfileForm = (props) => {
    const userSkills = props.user.userSkills || [''];

    return (
        <Form>
            <FormGroup controlid="userSkills">
                <Label for="userSkills">Competence highlights</Label>
                <ConsultantSkillsAutoSuggestions handleChange={props.handleChange} />
                {userSkills.map((skill, index) => { return <Badge key={index}>{skill}</Badge> })}
            </FormGroup>
            <FormGroup controlid="roleInterests">
                <Label for="roleInterests">Role interests</Label>
                <Input onChange={props.handleChange} type="text" name="roleInterests" id="roleInterests" value={ROLE_INTERESTS} />
            </FormGroup>
            <FormGroup controlid="lessPreferableRoles">
                <Label for="lessPreferableRoles">Less preferable roles</Label>
                <Input onChange={props.handleChange} type="text" name="lessPreferableRoles" id="lessPreferableRoles" value={LESS_PREFERABLE_ROLES} />
            </FormGroup>
        </Form>
    );
}

export default UserProfileForm;

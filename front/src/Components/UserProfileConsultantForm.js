import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

// HARD CODED FOR DEMO PURPOSES
const TECH_STACK = ["Javascript", "ReactJS", "GIT", "CSS", "REST API", "Scrum"];
const ROLE_INTERESTS = ["Front-end", "Back-end", "DevOps"];
const LESS_PREFERABLE_ROLES = ["Project manager", "Scrum Master"];

const UserProfileForm = (props) => {

    return (
        <Form>
            <FormGroup controlid="techStack">
                <Label for="techStack">Competence highlights</Label>
                <Input onChange={props.handleChange} type="text" name="techStack" id="techStack" value={TECH_STACK} />
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

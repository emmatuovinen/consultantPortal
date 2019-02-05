import React from 'react';
import { Form, FormGroup, Label, Input, Badge } from 'reactstrap';

import AutoSuggestions from '../Containers/AutoSuggestions';

// HARD CODED FOR DEMO PURPOSES
const ROLE_INTERESTS = ["Front-end", "Back-end", "DevOps"];
const LESS_PREFERABLE_ROLES = ["Project manager", "Scrum Master"];

const UserProfileForm = (props) => {
    return (
        <Form>
            <FormGroup controlid="techStack">
                <Label for="techStack">Competence highlights</Label>
                <AutoSuggestions handleChange={props.handleChange} />
                {props.user.techStack.map((tech, index) => { return <Badge key={index}>{tech}</Badge> })}
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

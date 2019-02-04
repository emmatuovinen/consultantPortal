import React from 'react';
import { Table, Label, Badge } from 'reactstrap';

// HARD CODED FOR DEMO PURPOSES
const techStack = ["Javascript", "ReactJS", "GIT", "CSS", "REST API", "Scrum"];
const roleInterests = ["Front-end", "Back-end", "DevOps"];
const lessPreferableRoles = ["Project manager", "Scrum Master"];

const UserProfileConsultantDetails = props => {

    return (
        <Table>
            <tbody>
                <tr>
                    <th scope="row"><Label>Competence highlights: </Label></th>
                    <td>
                        {techStack.map((tag, index) => {
                            return (<span key={index}><Badge>{tag}</Badge>&nbsp;</span>)
                        })}
                    </td>
                </tr>
                <tr>
                    <th scope="row"><Label>Role interests: </Label></th>
                    <td>
                        <Label>{roleInterests.map((role, index) => {
                            return (<div key={index}>{role}</div>)
                        })}</Label>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><Label>Less preferable roles: </Label></th>
                    <td>
                        <Label>{lessPreferableRoles.map((role, index) => {
                            return (<div key={index}>{role}</div>)
                        })}</Label>
                    </td>
                </tr>
            </tbody>
        </Table>
    );

}

export default UserProfileConsultantDetails;
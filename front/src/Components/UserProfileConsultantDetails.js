import React from "react";
import { Table, Label, Badge } from "reactstrap";


const UserProfileConsultantDetails = props => {
  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">
            <Label>Skills: </Label>
          </th>
          <td>
            {props.user.userSkills.map((tag, index) => {
              return (
                <span key={index}>
                  <Badge>{tag}</Badge>&nbsp;
                </span>
              );
            })}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <Label>Role interests: </Label>
          </th>
          <td>
            <Label>
              {props.user.preferableRoles.map((role, index) => {
                return <div key={index}>{role}</div>;
              })}
            </Label>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserProfileConsultantDetails;

import React from 'react';
import { Container, Label, Table, Col, Row } from 'reactstrap';
import UserProfileConsultantDetails from './UserProfileConsultantDetails';

// FOR DEMO PURPOSES
const DUMMY_LINKEDIN_LINK = 'https://www.linkedin.com/in/erkki-esimerkki/';
const DUMMY_GITHUB_LINK = 'https://www.github.com/erkki-esimerkki/';
const linkedInLogo = <img alt="LinkedIn" height="32" width="32" src='http://funerariamontedelosolivos.com/wp-content/uploads/2015/08/linkedin-logo.png' />;
const githubLogo = <img alt="Github" height="32" width="32" src='https://d1zx8a944ras19.cloudfront.net/wp-content/uploads/2017/12/Octicons-mark-github.svg' />;

const UserProfileDetails = (props) => {
    let user = props.user;
    return (
        <Row>
            <Col lg='1' /*style={{ backgroundColor: 'yellow' }}*/ ></Col>
            <Col lg='10'>
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.role}</p>
                <Row>
                    <Col md='6' style={{ textAlign: 'center' }}>
                        <p>
                            <img src='https://uploads-ssl.webflow.com/5a9d2249a2f0dc0001b64dcd/5bb1ca19bf42655317ad63cc_Laura%20Malinen.png' />
                        </p>
                    </Col>
                    <Col md='6'>
                        <p>{user.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <Table>
                            <tbody>
                                <tr>
                                    <th scope="row" style={{ width: '45%' }}><Label>Email:</Label></th>
                                    <td style={{ width: '55%' }}><Label>{user.email}</Label></td>
                                </tr>
                                <tr>
                                    <th scope="row"><Label>Phone number: </Label></th>
                                    <td><Label>{user.phoneNumber}</Label></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md='6'>
                        <Table>
                            <tbody>
                                <tr>
                                    <th scope="row">{linkedInLogo}</th>
                                    <td><a href={DUMMY_LINKEDIN_LINK}>{DUMMY_LINKEDIN_LINK}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">{githubLogo}</th>
                                    <td><a href={DUMMY_LINKEDIN_LINK}>{DUMMY_GITHUB_LINK}</a></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {props.userIsConsultant && <UserProfileConsultantDetails user={user} userIsConsultant={props.userIsConsultant} />}
            </Col>
            <Col lg='1' /*style={{ backgroundColor: 'yellow' }}*/ ></Col>
        </Row>
        // <div>
        //     <Table>
        //         <tbody>
        //             <tr>
        //                 <th scope="row"><Label>First name: </Label></th>
        //                 <td><Label>{user.firstName}</Label></td>
        //             </tr>
        //             <tr>
        //                 <th scope="row"><Label>Last name: </Label></th>
        //                 <td><Label>{user.lastName}</Label></td>
        //             </tr>
        //             <tr>
        //                 <th scope="row"><Label>Email: </Label></th>
        //                 <td><Label>{user.email}</Label></td>
        //             </tr>
        //             <tr>
        //                 <th scope="row"><Label>Phone number: </Label></th>
        //                 <td><Label>{user.phoneNumber}</Label></td>
        //             </tr>
        //             <tr>
        //                 <th scope="row"><Label>Description: </Label></th>
        //                 <td><Label>{user.description}</Label></td>
        //             </tr>
        //             <tr>
        //                 <th scope="row"><Label>Role: </Label></th>
        //                 <td><Label>{user.role}</Label></td>
        //             </tr>
        //         </tbody>
        //     </Table>
        //     {props.userIsConsultant && <UserProfileConsultantDetails user={user} userIsConsultant={props.userIsConsultant} />}
        // </div>
    );
}

export default UserProfileDetails;
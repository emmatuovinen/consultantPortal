import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';



const PositionForm = (props) => {
    let position = props.position;

    return (
        <Row>
            <Col lg='1'></Col>
            <Col lg='10'>
                <Form>
                    <FormGroup>
                        <Label for="company">Company</Label>
                        <Input onChange={props.handleChange} type="text" name="companyName" id="companyName" value={position.companyName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="positionDescription">Position description</Label>
                        <Input onChange={props.handleChange} type="text" name="positionDescription" id="positionDescription" value={position.positionDescription} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="positionRole">Position role</Label>
                        <Input onChange={props.handleChange} type="text" name="positionRole" id="positionRole" value={position.positionRole} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input onChange={props.handleChange} type="text" name="location" id="location" value={position.location} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Input onChange={props.handleChange} type="text" name="status" id="status" value={position.status} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="skills">Skills</Label>
                        <Input onChange={props.handleChange} type="text" name="skills" id="skills" value={position.skills} />
                    </FormGroup>
                    <Button
                        type="submit"
                        color="success"
                        onClick={props.handleSubmit}
                        style={{ margin: "0.5em" }}
                    >
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>

    );

}

export default PositionForm;
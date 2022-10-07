import Page from 'components/Page';
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Form, FormGroup, Input, Label, CardTitle, CardText
} from 'reactstrap';
export default class CandidateDetails extends React.Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem("token")

        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = { loggedIn };
        console.log('arrayData' + this.props.arrayData)
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            <Page
                className="Candidate"
                title="Candidate Details"
                breadcrumbs={[{ name: 'Candidate', active: true }]}
            >
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader className="nav-button-css">Candidate basic information
                            </CardHeader>
                            <FormGroup>
                                <Row className="m-2">
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">First Name</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_firstName} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Middle Name</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_middleName} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Last Name</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_lastName} readOnly />
                                    </Col>
                                </Row>
                                <Row className="m-2">
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Gender</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_gender} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Date of birth</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_dateOfBirth} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Caste</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_caste} readOnly />
                                    </Col>
                                </Row>
                                <Row className="m-2">
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Mobile Number</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_phone} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">E-mail ID</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_email} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Adhar Card Number</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_adhar} readOnly />
                                    </Col>
                                </Row>
                                <Row className="m-2">
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Residential Address</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_address} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Physical Disability Status</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_phyDisability} readOnly />
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Label for="jobName">Ex-Servicemen</Label>
                                        <Input type="text" name="jobName" value={this.props.arrayData.u_exServicemen} readOnly />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Card>
                        <Card className="mb-3">
                            <CardHeader className="nav-button-css bold">High School Details (10th)
                            </CardHeader>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">First Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_firstName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Last Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_lastName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Roll Number</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_RollNo} readOnly />
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Mother Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_motherName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">FatherName</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_fatherName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">School Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_SchoolName} readOnly />
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Board Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_BoardName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Passing Year</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_PassingYear} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Percentage(%)</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_Percentage} readOnly />
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">CGPA</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.HS_CGPA} readOnly />
                                </Col>
                            </Row>
                        </Card>
                        <Card className="mb-3">
                            <CardHeader className="nav-button-css">Secondary School Details (12th)
                            </CardHeader>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">First Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_fastName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Last Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_lastName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Roll Number</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_RollNo} readOnly />
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Mother Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_motherName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">FatherName</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_fatherName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">School Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_SchoolName} readOnly />
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Board Name</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_BoardName} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Passing Year</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_PassingYear} readOnly />
                                </Col>
                                <Col md={6} lg={4}>
                                    <Label for="jobName">Percentage(%)</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_Percentage} readOnly />
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col md={6} lg={4}>
                                    <Label for="jobName">CGPA</Label>
                                    <Input type="text" name="jobName" value={this.props.arrayData.SS_CGPA} readOnly />
                                </Col>
                            </Row>
                        </Card>
                        <Card className="mb-3">
                            <CardHeader className="nav-button-css">Graduation Details
                            </CardHeader>
                        </Card>
                        <Card className="mb-3">
                            <CardHeader className="nav-button-css">Post Graduation Details
                            </CardHeader>
                        </Card>
                        <Card className="mb-3">
                            <CardHeader className="nav-button-css">Additional Education Details
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Page >
        )
    }
}

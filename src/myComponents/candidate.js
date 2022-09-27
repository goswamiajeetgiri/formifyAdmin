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
    ModalHeader, Form, FormGroup, Input, Label,
} from 'reactstrap';
import { getJobData, addEditJob } from '../shared/services/authService';
const today = new Date();
const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
);
class CandidateListPage extends React.Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem("token")

        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            ListArray: [], loggedIn,
            modal: false,
            modal_backdrop: false,
            modal_nested_parent: false,
            modal_nested: false,
            backdrop: false,
            jobName: '',
            jobDescription: '',
            jobUrl: '',
            jobId: 0, JobLastDate: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0);
    }
    componentWillMount() {
        this.getAllJobList('');
    }
    getAllJobList(data) {
        debugger
        getJobData(data).then(response => {
            debugger
            if (response.ResultSets[0][0]) {
                this.setState({ ListArray: response.ResultSets[0] });
            }
        }).catch(error => {
            console.error("error occurred");
            console.error(error);
        });
    }
    tabRow() {
        return this.state.ListArray.map(function (object, i) {
            return <Table obj={object} key={i} />;
        });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        debugger
        event.preventDefault();
        var data = {
            jobId: this.state.jobId,
            jobName: this.state.jobName,
            jobDescription: this.state.jobDescription,
            jobUrl: this.state.jobUrl,
            JobLastDate: this.state.JobLastDate
        };
        addEditJob(data).then(response => {
            debugger
            if (response.ResultSets[0][0].Status == 1) {
                event.preventDefault();
                this.toggle('backdrop')
                this.getAllJobList('');
            } else {
                this.toggle('backdrop')
            }
        }).catch(error => {
            console.error("error occurred");
            console.error(error);
        });
    }
    toggle(modalType) {
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }
        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
        });
        this.setState({
            jobName: '',
            jobDescription: '',
            jobUrl: '',
            JobLastDate: ''
        })
    }
    onEditJob(data) {
        this.toggle('backdrop')
        this.setState({
            jobId: data.Jobid,
            jobName: data.JobName,
            jobDescription: data.JobDetails,
            jobUrl: data.JobDetailsUrl,
            JobLastDate: data.JobLastDate
        })
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            <Page
                className="Candidate"
                title="Candidate"
                breadcrumbs={[{ name: 'Candidate', active: true }]}
            >
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader className="nav-button-css">Candidate List
                                <Button onClick={this.toggle.bind(this, 'backdrop')}>Add Candidate</Button>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Job Name</th>
                                            <th>Job Details</th>
                                            <th>Job Details Url</th>
                                            <th>Job Last Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ListArray && this.state.ListArray.map(user =>
                                            <tr key={user.Jobid}>
                                                <td>{user.JobName}</td>
                                                <td>{user.JobDetails}</td>
                                                <td>{user.JobDetailsUrl}</td>
                                                <td>{user.JobLastDate}</td>
                                                <td className='displayFlex'>
                                                    <Button color="success" onClick={this.onEditJob.bind(this, user)}>
                                                        Edit
                                                    </Button>
                                                    <Button color="primary" onClick={this.onEditJob.bind(this, user)}>
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                    <Modal
                        isOpen={this.state.modal_backdrop}
                        toggle={this.toggle.bind(this, 'backdrop')}
                        backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle.bind(this, 'backdrop')}>
                            Add/Edit Job
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="jobName">Job Name</Label>
                                    <Input type="text" name="jobName" placeholder="Job Name" onChange={this.handleChange} value={this.state.jobName} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="jobDescription">Job Description</Label>
                                    <Input type="text" name="jobDescription" placeholder="Job Description" value={this.state.jobDescription} onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="jobUrl">Job Url</Label>
                                    <Input type="text" name="jobUrl" placeholder="Job Url" value={this.state.jobUrl} onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleDate">Job Last Date</Label>
                                    <Input
                                        type="date"
                                        name="JobLastDate"
                                        id="exampleDate"
                                        placeholder="date placeholder"
                                        value={this.state.JobLastDate} onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle.bind(this, 'backdrop')}>
                                Cancel
                            </Button>{' '}
                            <Button color="success" onClick={this.handleSubmit}>
                                sAVE
                            </Button>

                        </ModalFooter>
                    </Modal>
                </Row>
            </Page>
        );
    }
}
export default CandidateListPage;

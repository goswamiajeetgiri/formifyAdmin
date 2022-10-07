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
import { getCandidateList, addEditJob } from '../shared/services/authService';
import CandidateDetails from './candidateDetails';
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
            jobId: 0, JobLastDate: '',
            arrayData: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0);
    }
    componentWillMount() {
        this.getCandidateList('');
    }
    getCandidateList(data) {
        debugger
        getCandidateList(data).then(response => {
            debugger
            if (response.ResultSets[0][0]) {
                debugger
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
    viewCandidateDetails(data) {
        this.toggle('backdrop')
        this.setState({ arrayData: data });
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
                                {/* <Button onClick={this.toggle.bind(this, 'backdrop')}>Add Candidate</Button> */}
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Date Of Birth</th>
                                            <th>Gender</th>
                                            <th>Phone No</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ListArray && this.state.ListArray.map(user =>
                                            <tr key={user.u_u_userId}>
                                                <td>{user.u_firstName}</td>
                                                <td>{user.u_lastName}</td>
                                                <td>{user.u_dateOfBirth}</td>
                                                <td>{user.u_gender}</td>
                                                <td>{user.u_phone}</td>
                                                <td>{user.u_email}</td>
                                                <td className='displayFlex'>
                                                    {/* <Button color="success" onClick={this.viewCandidateDetails.bind(this, user)}>
                                                        Edit
                                                    </Button> */}
                                                    <Button color="primary" onClick={this.viewCandidateDetails.bind(this, user)}>
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

                    <Modal className="modalDisplay"
                        isOpen={this.state.modal_backdrop}
                        toggle={this.toggle.bind(this, 'backdrop')}
                        backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle.bind(this, 'backdrop')}>
                        </ModalHeader>
                        <ModalBody>
                            <CandidateDetails arrayData={this.state.arrayData}></CandidateDetails>

                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="secondary" onClick={this.toggle.bind(this, 'backdrop')}>
                                Cancel
                            </Button>{' '}
                            <Button color="success" onClick={this.handleSubmit}>
                                sAVE
                            </Button>

                        </ModalFooter> */}
                    </Modal>
                </Row>
            </Page>
        );
    }
}
export default CandidateListPage;

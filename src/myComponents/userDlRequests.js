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
import { getColor } from 'utils/colors';
import { getDLRequestsData } from '../shared/services/requestServices';
const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);
class DLRequestsListPage extends React.Component {
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
    this._getAllDLRequestsList('');
  }
  _getAllDLRequestsList(data) {
    debugger
    getDLRequestsData(data).then(response => {
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
        className="DashboardPage"
        title="DL Requests"
        breadcrumbs={[{ name: 'DL Requests', active: true }]}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader className="nav-button-css">DL Requests
                {/* <Button onClick={this.toggle.bind(this, 'backdrop')}>Add Job</Button> */}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                    <th>ID</th>
                      <th>DL Request Type</th>
                      <th>User FullName</th>
                      <th>User Email</th>
                      <th>User Phone</th>
                      <th>Applied Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.ListArray && this.state.ListArray.map(user =>
                      <tr key={user.DL_Rid}>
                        <td>{user.DL_Rid}</td>
                        <td>{user.DL_Type}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{''}</td>
                        <td className='displayFlex'>
                          <Button color="success" onClick={this.onEditJob.bind(this, user)}>
                            Update Status
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
             Update DL Form Status
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="jobName"> Enter Status Count (max 6)</Label>
                  <Input type="text" name="jobName" placeholder="Enter Status Count(0 to 6)" onChange={this.handleChange} value={this.state.jobName} />
                </FormGroup>
                {/* <FormGroup>
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
                </FormGroup> */}
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
export default DLRequestsListPage;

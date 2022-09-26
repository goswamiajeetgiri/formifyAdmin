import Page from 'components/Page';
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table, Button
} from 'reactstrap';
import { getColor } from 'utils/colors';
import { getUserData } from '../shared/services/authService';
const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);
class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token")

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = { UserListArray: [], loggedIn };
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }
  componentWillMount() {
    this.getAllUSerList('');
  }
  getAllUSerList(data) {
    debugger
    getUserData(data).then(response => {
      debugger
      if (response.ResultSets[0][0]) {
        this.setState({ UserListArray: response.ResultSets[0] });
      }
    }).catch(error => {
      console.error("error occurred");
      console.error(error);
    });
  }
  tabRow() {
    return this.state.UserListArray.map(function (object, i) {
      return <Table obj={object} key={i} />;
    });
  }
  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />
    }
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader className="nav-button-css">User List
                {/* <Button>Add Job</Button> */}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.UserListArray && this.state.UserListArray.map(user =>
                      <tr key={user.userId}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;

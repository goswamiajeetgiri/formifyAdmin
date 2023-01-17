import React, { useState,useEffect } from 'react';
import Page from 'components/Page';
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
import {_sendNewPushNotification} from '../shared/services/NotificationServices'
const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);


  const DLRequestsListPage = props => {
    
  const token = localStorage.getItem("token")
  const [ListArray, setListArray] = useState([]);
  const [modal, setmodal] = useState(false);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_nested_parent, setmodal_nested_parent] = useState(false);
  const [modal_nested, setmodal_nested] = useState(false);
  const [backdrop, setbackdrop] = useState(false);
  const [jobName, setjobName] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [jobUrl, setjobUrl] = useState('');
  const [jobId, setjobId] = useState(0);
  const [JobLastDate, setJobLastDate] = useState('');

  let loggedIn = true;
  if (token == null) {
    loggedIn = false;
  }

  useEffect(() => {
    
    window.scrollTo(0, 0);
    _getAllDLRequestsList('')
  }, []);

 const _getAllDLRequestsList =(data)=> {

    getDLRequestsData(data).then(response => {
      debugger
      if (response.ResultSets[0][0]) {
        setListArray(response.ResultSets[0])
       
      }
    }).catch(error => {
      console.error("error occurred");
      console.error(error);
    });
  }

  const sendPushNotificationStatus= async(data)=> {

      let res = await _sendNewPushNotification(data)
      alert(JSON.stringify(res))


  }

 const tabRow=()=> {
    return ListArray.map(function (object, i) {
      return <Table obj={object} key={i} />;
    });
  }

  // handleChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  // handleSubmit = event => {
   
  // }

 const toggle=(modalType)=> {
    if (!modalType) {
      return setmodal(!modal)
    }

    // this.setState({
    //   [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    // });
    setjobName('')
    setjobDescription('')
    setjobUrl('')
    setJobLastDate('')

  }

  if (loggedIn === false) {
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
                    {ListArray && ListArray.map(user =>
                      <tr key={user.DL_Rid}>
                        <td>{user.DL_Rid}</td>
                        <td>{user.DL_Type}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{''}</td>
                        <td className='displayFlex'>
                          <Button color="success" onClick={sendPushNotificationStatus}>
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


        </Row>
      </Page>
    );
  
 
}
export default DLRequestsListPage;







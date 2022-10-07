import logo200Image from 'assets/img/logo/AppLogoNew.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Card, Col, Row } from 'reactstrap';
import { registerUserCall, loginUserCall } from '../shared/services/authService';
import PageSpinner from './PageSpinner';
class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token")

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      email: '',
      password: '',
      confPassword: '',
      loggedIn
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }
  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //   console.log(name + 'name')
  //   console.log(value + 'value')
  //   this.setState({
  //     [name]: value
  //   });
  // }
  handleChange = (event) => {

    debugger
    this.setState({ [event.target.name]: event.target.value });
  }
  changeAuthState = authState => event => {
    event.preventDefault();
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
    // this.props.onChangeAuthState(authState);
  };
  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  handleSubmit = event => {
    debugger
    event.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    if (this.isSignup) {
      registerUserCall(data).then(response => {
        debugger
        if (response.ResultSets[0][0].Status == 1) {
          this.props.history.push('/login');
        } else {
          this.props.history.push('/signup');
        }
        console.log(response);
      }).catch(error => {
        console.error("error occurred");
        console.error(error);
      });
    } else {
      loginUserCall(data).then(response => {
        debugger
        if (response.ResultSets.length > 1) {
          if (response.ResultSets[0][0].Status == 1) {
            localStorage.setItem("token", "djhajshjkjdshjh12alsl")
            this.setState({ loggedIn: true })
            // this.props.history.push('/dashboard');
          } else {
            this.props.history.push('/login');
          }
        } else {
          this.props.history.push('/login');
        }

        console.log(response);
      }).catch(error => {
        console.error("error occurred");
        console.error(error);
      });
    }


  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;
    if (this.state.loggedIn) {
      debugger
      return <Redirect to="/dashboard" />

    }
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <Form onSubmit={this.handleSubmit}>
              {showLogo && (
                <div className="text-center pb-4">
                  <img
                    src={logo200Image}
                    className="rounded"
                    style={{ width: 120, height: 80, cursor: 'pointer' }}
                    alt="logo"
                    onClick={onLogoClick}
                  />
                </div>
              )}
              <FormGroup>
                <Label for={usernameLabel}>{usernameLabel}</Label>
                <Input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} validate={this.validateEmail} />
              </FormGroup>
              <FormGroup>
                <Label for={passwordLabel}>{passwordLabel}</Label>
                <Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
              </FormGroup>
              {this.isSignup && (
                <FormGroup>
                  <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                  <Input type="password" name="confPassword" placeholder="Password" value={this.state.confPassword} onChange={this.handleChange} />
                </FormGroup>
              )}
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
                </Label>
              </FormGroup>
              <hr />
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}>
                {this.renderButtonText()}
              </Button>

              <div className="text-center pt-1">
                <h6>or</h6>
                <h6>
                  {this.isSignup ? (
                    <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                      Login
                    </a>
                  ) : (
                    <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                      Signup
                    </a>
                  )}
                </h6>
              </div>

              {children}
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => { },
};

export default AuthForm;

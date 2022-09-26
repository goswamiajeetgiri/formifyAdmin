import React from 'react';
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    get isLogin() {
        return this.props.authState === STATE_LOGIN;
    }

    get isSignup() {
        return this.props.authState === STATE_SIGNUP;
    }

    changeAuthState = authState => event => {
        event.preventDefault();

        this.props.onChangeAuthState(authState);
    };
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
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
            </form>
        );
    }
}
export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';
export default RegisterPage;
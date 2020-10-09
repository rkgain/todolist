import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';
import {ForgotPasswordLink} from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import Loader from '../UI/Loader';
import { logDOM } from '@testing-library/react';

const SignUpPage = () => (
    <div >
        <SignInForm />
       
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    loader:false,
};
class SignUpBase extends Component {
    constructor(props) { super(props); this.state = { ...INITIAL_STATE } }

    onSubmit = event => {
        const { email, password } = this.state;
        this.setState({error:null,loader:true});
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error ,loader:false});
            })
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        let isInvalid =
            password === '' ||
            email === '';
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form">
                    <h1>Sign In</h1>
                    <div className="tab-content">
                        <div id="signup">
                            <div className="field-wrap">

                                <input
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    type="email"
                                    placeholder="Email Address"
                                />
                            </div>

                            <div className="field-wrap">

                                <input
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button type="submit" disabled={isInvalid} className="button button-block">Sign In</button>

                            {error && <p>{error.message}</p>}
                        </div>
                        <Loader show={this.state.loader}/>
                        <SignUpLink />
                        <ForgotPasswordLink/>
                    </div>
                </div>
            </form>
        )
    }
}


const SignInForm = compose(
    withRouter,
    withFirebase)
    (SignUpBase);



const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
);


export default SignUpPage;

export { SignInLink };
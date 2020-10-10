import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { SignInLink } from '../SignIn'
import * as ROUTES from '../../constants/routes';
import Loader from '../UI/Loader';


const ResetPasswordPage = () => (
    <div >
        <ResetPasswordForm />

    </div>
);

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
    loader: false,
};
class ResetPasswordBase extends Component {
    constructor(props) { super(props); this.state = { ...INITIAL_STATE } }

    onSubmit = event => {
        const { passwordOne } = this.state;
        this.setState({ error: null, loader: true });
        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                //  this.setState({ ...INITIAL_STATE});
                // this.props.history.push(ROUTES.HOME)
                this.setState({
                    loader: false,
                    email: '',
                    error: { message: 'Password has been changed ' }
                });
                console.log({ ...this.state });
            })
            .catch(error => {
                this.setState({ error, loader: false });
            })
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form">
                    <h1>Chnage Password</h1>
                    <div className="tab-content">
                        <div id="signup">
                            <div className="field-wrap">

                                <input
                                    name="passwordOne"
                                    value={passwordOne}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="New Password"
                                />
                            </div>
                            <div className="field-wrap">

                                <input
                                    name="passwordTwo"
                                    value={passwordTwo}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <button type="submit" disabled={isInvalid} 
                            className="button button-block">Change Password</button>

                            {error && <p>{error.message}</p>}
                        </div>
                        <Loader show={this.state.loader} />
                        <SignInLink />
                    </div>
                </div>
            </form>
        )
    }
}


const ResetPasswordForm = compose(
    withFirebase)
    (ResetPasswordBase);



// const ForgotPasswordLink = () => (
//     <p>
//         Forget password? <Link to={ROUTES.PASSWORD_FORGET}>Reset here</Link>
//     </p>
// );


export default ResetPasswordPage;

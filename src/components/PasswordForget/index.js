import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp'
import * as ROUTES from '../../constants/routes';
import Loader from '../UI/Loader';


const ForgotPasswordPage = () => (
    <div >
        <ForgotPasswordForm />
       
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
    loader:false,
};
class ForgotPasswordBase extends Component {
    constructor(props) { super(props); this.state = { ...INITIAL_STATE } }

    onSubmit = event => {
        const { email} = this.state;
        this.setState({error:null,loader:true});
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
              //  this.setState({ ...INITIAL_STATE});
               // this.props.history.push(ROUTES.HOME)
               this.setState({
                   loader:false,
                   email:'', 
                   error : {message: 'Password reset link has been sent to your email.'}
                });
                console.log({...this.state});
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
            error,
        } = this.state;

        let isInvalid =
            email === '';
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form">
                    <h1>Forgot Password</h1>
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

                        
                            <button type="submit" disabled={isInvalid} className="button button-block">Reset Password</button>

                            {error && <p>{error.message}</p>}
                        </div>
                        <Loader show={this.state.loader}/>
                        <SignUpLink />
                    </div>
                </div>
            </form>
        )
    }
}


const ForgotPasswordForm = compose(
    withFirebase)
    (ForgotPasswordBase);



const ForgotPasswordLink = () => (
    <p>
        Forget password? <Link to={ROUTES.PASSWORD_FORGET}>Reset here</Link>
    </p>
);


export default ForgotPasswordPage;

export { ForgotPasswordLink };
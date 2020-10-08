import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './signup.css';
const SignUpPage = () => (
  <div>
    
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.email);
  };
 
  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      let isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
        <form onSubmit={this.onSubmit}>
        <div className="form">
        <h1>SignUp</h1>
      <div className="tab-content">
        <div id="signup">   
          <div className="field-wrap">
           
            <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Name"
        />
          </div>

          <div className="field-wrap">
          
            <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
          </div>
          
          <div className="field-wrap">
           
            <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
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
          
          <button type="submit" disabled={isInvalid} className="button button-block">Get Started</button>
          
          {error && <p>{error.message}</p>}

        </div>
        
      
        
      </div>
      
</div>



      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };
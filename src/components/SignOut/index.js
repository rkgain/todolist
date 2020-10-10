import React from 'react';
import * as ROUTES from '../../constants/routes';
import {  withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
 const Out=(firebase,history)=>{ firebase.doSignOut();
history.push(ROUTES.SIGN_IN)
}
const SignOutButton = ({ firebase,history }) => (

  <button type="button" onClick={()=>Out(firebase,history)}>
  Sign Out
</button>
  // <button type="button" onClick={()=>Out(firebase)}>
  //   Sign Out
  // </button>
);

export default withRouter(withFirebase(SignOutButton));
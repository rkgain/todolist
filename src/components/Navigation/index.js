import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';


const Navigation = () => (

  <AuthUserContext.Consumer>
    {(authUser) =>
      <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
    }
  </AuthUserContext.Consumer>


)


const NavigationAuth = () => (
  <div>

    <header className="header">
      <h1 className="logo"><a href="#ioio">ToDO List </a> </h1>
      <ul className="main-nav">

        {/* <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li> */}
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
   
        <li>
          <SignOutButton />
        </li>
      </ul>
    </header>
  </div>
);

const NavigationNonAuth = () => (
  <header className="header">
    <h1 className="logo"><a href="#ioio">Flexbox </a> </h1>
    <ul className="main-nav">
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
    </ul>
  </header>
);

export default Navigation;
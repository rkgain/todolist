import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import * as ROUTES from '../../constants/routes';
 
const Navigation = () => (
  <div>

<header className="header">
		<h1 className="logo"><a href="#">Flexbox</a></h1>
      <ul className="main-nav">
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      </ul>
	</header> 


    
  </div>
);
 
export default Navigation;
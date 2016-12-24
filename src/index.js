import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Photos from './components/Photos';
import Login from './components/Login';
import Admin from './components/Admin';
import AuthService from './utils/AuthService'
import './css/index.css';
import {Router, Route, browserHistory, Link} from 'react-router';

const auth = new AuthService('MD0gkfSGRtjwOyshSOQHxFWDlSe3sLzC', 'tmizzle2005.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

ReactDOM.render(
  <Router history={browserHistory} auth={auth}>
    <Route path="/" component={App}/>
    <Route path="/photos" component={Photos}/>
    <Route path="/login" component={Login}/>
    <Route path="/admin" component={Admin} onEnter={requireAuth}/>
  </Router>, 
  document.getElementById('root')
);

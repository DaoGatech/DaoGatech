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
  //because the page can't set the id token fast enough, check the nextState to see if the hash exists
  //if it does exist then grab the id token from the hash and then set it to local storage
  if (nextState.location.hash) {
    //you can use regex here, it would be a lot more efficent
    const hashString = nextState.location.hash;
    const idString = '&id_token';
    const firstIndex = hashString.indexOf(idString) + idString.length + 1;
    const lastIndex = hashString.indexOf('&token_type=');
    localStorage.setItem('id_token', hashString.substring(firstIndex, lastIndex));
  }
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
    return false;
  }
  return true;
};



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} path="/" auth={auth}>
      <Route path="/photos" component={Photos}/>
      <Route path="/login" component={Login}/>
      <Route path="/admin" component={Admin} onEnter={requireAuth}/>
    </Route>
  </Router>, 
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Photos from './components/Photos';
import Login from './components/Login';
import './css/index.css';
import {Router, Route, browserHistory, Link} from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/photos" component={Photos}/>
    <Route path="/login" component={Login}/>
  </Router>, 
  document.getElementById('root')
);

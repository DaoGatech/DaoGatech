import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Photos from './components/Photos';
import './css/index.css';
import {Router, Route, browserHistory, Link} from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/photos" component={Photos}/>
  </Router>, 
  document.getElementById('root')
);

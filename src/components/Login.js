import React, { Component, PropTypes as T } from 'react';
import '../css/Login.css';
import '../css/Photos.css';
import $ from 'jquery';
import AuthService from '../utils/AuthService'
import Logo from '../assets/logo.png';

class Login extends Component {
  
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }
  
  render() {
    const { auth } = this.props;
    return (  
      <div className="App">
      <div className="App-header">
          <div className="nav">
            <div className="left-section">
              <img src={Logo} className="App-logo" alt="logo" /> 
              <div className="app-title">DAOGATECH</div>
            </div>
            <div className="right-section">         
              <button className="nav-buttons"><a className="inside-nav" href="/">Home</a></button>
              <button className="nav-buttons"><a className="inside-nav" href="/photos">Photos</a></button>
              <button className="nav-buttons"><a className="inside-nav" href="/login">Login</a></button>
            </div>
            
          </div>
        </div>
        <button onClick={auth.login.bind(this)} type="button" className="btn btn-lg btn-success btn-block login-btn">Login to Admin</button>      
			</div>
	
    );
  }
 
}
export default Login;

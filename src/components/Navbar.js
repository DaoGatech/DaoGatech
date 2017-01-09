import React, { Component, PropTypes as T } from 'react';
import '../css/Navbar.css';
import $ from 'jquery';
import AuthService from '../utils/AuthService'
import Logo from '../assets/logo.png';

class Navbar extends Component {
  
render() {
    const { auth } = this.props;
    return (  
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
    );
  }
 
}
export default Navbar;

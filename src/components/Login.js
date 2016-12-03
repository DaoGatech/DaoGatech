import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Logo from '../assets/logo.png';

class Login extends Component {
  render() {
    return (  
      <div className="App">
        <div className="App-header">
          <div className="nav">
            <div className="left-section">
              <img src={Logo} className="App-logo" alt="logo" /> 
              <div className="app-title">DAOGATECH</div>
            </div>
            <div className="right-section">         
              <button><a style={{"textDecoration": "none", "color": "inherit"}} href="/photos">Photos</a></button>
              <button><a style={{"textDecoration": "none", "color": "inherit"}} href="/">Home</a></button>
            </div>
            
          </div>
        </div>
      </div>

    );
  }
 
}
export default Login;

import React, { Component } from 'react';
import {OAuthSignInButton} from "redux-auth/material-ui-theme";

class Login extends Component {
  
  

  render() {
    return (  
      <OAuthSignInButton provider="github" />
    );
  }
 
}
export default Login;

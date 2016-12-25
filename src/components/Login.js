import React, { Component, PropTypes as T } from 'react';
import '../css/Login.css';
import $ from 'jquery';
import AuthService from '../utils/AuthService'

class Login extends Component {
  
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }
  
  render() {
    const { auth } = this.props;
    return (  
      <div className="App">
        <button onClick={auth.login.bind(this)} type="button" className="btn btn-lg btn-success btn-block login-btn">Login to Admin</button>      
			</div>
	
    );
  }
 
}
export default Login;

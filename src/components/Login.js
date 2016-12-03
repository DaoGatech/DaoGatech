import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Logo from '../assets/logo.png';
import Validation from 'react-validation';
import '../css/Login.css';

class Login extends Component {
  render() {
    return (  
      <div className="App">
       
        <div className="row">
		      <div className="col-md-4 col-md-offset-4">
    		    <div className="panel panel-default">
			  	    <div className="panel-heading">
			    	    <h3 className="panel-title">Please sign in</h3>
			 	      </div>
			  	    <div className="panel-body">
			    	    <form>
                <div className="form-group">
			    		      <input className="form-control" placeholder="Username" name="username" type="text"/>
			    		    </div>
			    		    <div className="form-group">
			    			    <input className="form-control" placeholder="Password" name="password" type="password"/>
			    		    </div>
			    		    <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"/>
			      	</form>
			    </div>
			</div>
		</div>
	</div>
      </div>

    );
  }
 
}
export default Login;

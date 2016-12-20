import React, { Component } from 'react';
import '../css/Login.css';
import $ from 'jquery';

class Login extends Component {

  constructor(props){
    super(props);
    
  }

 
  authenticate() {
    console.log("log");
    let username_val = document.getElementById("username").value;
    let password_val = document.getElementById("password").value;
     $.post("https://daowebapi.herokuapp.com/authenticate", {
        username: username_val,
        password: password_val
    },
    function(data, status){
      console.log(data.message);
      if(data.message === "PASS") {
          window.location.href = "/admin";
      } else {
        console.log("nah");
      }
    });
  }


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
                <div className="form-group">
			    		      <input id="username" className="form-control" placeholder="Username" name="username" type="text"/>
			    		    </div>
			    		    <div className="form-group">
			    			    <input id="password" className="form-control" placeholder="Password" name="password" type="password"/>
			    		    </div>
			    		    <button onClick={this.authenticate} type="button" className="btn btn-lg btn-success btn-block">Login</button>
			    </div>
			</div>
		</div>
	</div>
      </div>

    );
  }
 
}
export default Login;

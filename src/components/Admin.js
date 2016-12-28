import React, { Component, PropTypes as T} from 'react';
import '../css/Admin.css';
import $ from 'jquery';
import AuthService from '../utils/AuthService'
import {Button} from 'react-bootstrap'

var Tabs = require('pui-react-tabs').Tabs;
var LeftTabs = require('pui-react-tabs').LeftTabs;
var Tab = require('pui-react-tabs').Tab;


class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgSrc : ""
    };
    
  }
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  logout() {
    // destroys the session data
    this.props.auth.logout()
    // redirects to photos page
    this.context.router.push('/login');
  }

  imageChange(e) {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file)
    $('#uploadBtn').css('visibility','visible');
  }

  upload() {
    if(this.state.file !== undefined) {
      var fd = new FormData();
      fd.append("file", this.state.file);
      fd.append("location",$('#location').val());
      fd.append("description",$('#description').val());
      $.ajax({
        url: 'https://daowebapi.herokuapp.com/upload',
        data: fd,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
          if(data.message === 'PASS') {
            alert("Image uploaded successfully");
          } else {
            alert("Fail to upload. Try again");
          }
        }
      });
    }
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />)
    } else {
      imagePreview = (<image>Please choose the image. </image>)
    }

    return (  
      
      <div className="App">
      <div className="App-header">
          <div className="nav">
            ADMIN
            <button onClick={this.logout.bind(this)}><a style={{"textDecoration": "none", "color": "inherit"}} href="">Logout</a></button>
          </div>
        </div>
       <LeftTabs defaultActiveKey={1} tabWidth={7} paneWidth={9}>
            <Tab eventKey={1} title="Upload Pictures">
              <input type="text" className="form-control" id="location" placeholder="Location"/>
              <input type="text" className="form-control" id="description" placeholder="Description"/>
              <div className="uploadWrapper">
                Choose file: <label className="btn btn-default btn-file">
                  Browse <input ref="file" onChange={(e)=>this.imageChange(e)} id="imgURL" type="file" style={{display: 'none'}}/>
                </label>
              </div>
              <div className="previewWrapper">
                <imgPreview>
                  {imagePreview}
                </imgPreview>
              </div>
              <button onClick={(e)=>this.upload()} id="uploadBtn" className="btn btn-primary">Upload</button>
            </Tab>
        </LeftTabs>
      </div>

    );
  }
 
}
export default Admin;

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
  
  resizeBase64Img(base64, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    var deferred = $.Deferred();
    $("<img/>").attr("src", base64).on('load', function() {
        context.scale(width/this.width,  height/this.height);
        context.drawImage(this, 0, 0); 
        deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));               
    });
    return deferred.promise();    
  }

  srcToFile(src, fileName, mimeType){
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );  
  }

  imageChange(e) {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    let parent = this;
    reader.onloadend = () => {
      let img_src;
      this.resizeBase64Img(reader.result, 800, 600).then(function(newImg){
        img_src = newImg[0].currentSrc;
        parent.srcToFile(img_src, 'result.png', 'image/png')
          .then(function(file){
            parent.setState({
              file: file,
              imagePreviewUrl: reader.result
            })
          })
          .catch(console.error);
      });
      
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
      fd.append("dateposted",$('#dateposted').val());
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
      imagePreview = (<img width="100%" src={imagePreviewUrl} />)
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
       <div className="container">
        <LeftTabs tabType="simple" defaultActiveKey={1} tabWidth={7} paneWidth={17}>
            <Tab eventKey={1} title="Home"></Tab>
            <Tab eventKey={2} title="Upload Pictures">
              <input type="text" className="form-control upload-input" id="location" placeholder="Location"/>
              <input type="text" className="form-control upload-input" id="description" placeholder="Description"/>
              <input type="date" className="form-control upload-input" id="dateposted"/>
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
      </div>

    );
  }
 
}
export default Admin;

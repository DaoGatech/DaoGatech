import React, { Component } from 'react';
import '../css/Admin.css';
import $ from 'jquery';

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
          </div>
        </div>
       <LeftTabs defaultActiveKey={1} tabWidth={7} paneWidth={9}>
            <Tab eventKey={1} title="Upload Pictures">
              <input type="text" className="form-control" id="location" placeholder="Location"/>
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
              <button id="uploadBtn" className="btn btn-primary">Upload</button>
            </Tab>
        </LeftTabs>
      </div>

    );
  }
 
}
export default Admin;

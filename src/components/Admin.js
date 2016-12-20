import React, { Component } from 'react';

var Tabs = require('pui-react-tabs').Tabs;
var LeftTabs = require('pui-react-tabs').LeftTabs;
var Tab = require('pui-react-tabs').Tab;

class Admin extends Component {
  constructor(props){
    super(props);
    
  }

  render() {
    return (  
      
      <div className="App">
       <LeftTabs defaultActiveKey={1} tabWidth={7} paneWidth={9}>
            <Tab eventKey={1} title="Upload Pictures">Wow!</Tab>
        </LeftTabs>
      </div>

    );
  }
 
}
export default Admin;

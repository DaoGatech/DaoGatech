import React, { Component, PropTypes as T }  from 'react';
import '../css/App.css';
import { Jumbotron } from 'react-bootstrap';

class App extends Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <div>
        {children}
      </div>
    )
  } 
}
export default App;

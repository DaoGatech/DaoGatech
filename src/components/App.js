import React, { Component } from 'react';
import '../css/App.css';
import { ReactRpg } from 'react-rpg';
import FontAwesome from 'react-fontawesome';
import Logo from '../assets/logo.png';
import Modal from 'react-modal';
import $ from 'jquery';
import FacebookProvider, { Like, Share, Comments} from 'react-facebook';

const customStyles = {
overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0,0,0,0.5)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '75%',
    height                : '70%',
    padding               : '0',
    transform             : 'translate(-50%, -50%)'
  }
};

let hashCode = function(str){
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}

let map = {};

class App extends Component {
  
  constructor(props) {
		super(props);
    this.state = {
                  username: "daostephen",
                  alias: "@tmizzle2005",
                  images: [],
                  modalIsOpen: false,
                  currentUrl: "",
                  currentLocation : ""
    };
	}
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    //this.refs.subtitle.style.color = '#f00';
  }

  closeModal(event) {
    event.preventDefault();
    this.setState({modalIsOpen: false});
  }

	componentWillMount() {
    $.get('http://daowebapi.herokuapp.com/user/images').done(function(data) {
      let temp = [];
      for(var index = 0; index < data.length; index++) {
          map[hashCode(data[index].url)] = data[index].location; 
          temp.push(
            { url : data[index].url ,
              clickHandler: (url, obj) => { 
                this.setState({currentUrl: url, currentLocation: map[hashCode(url)]});
                this.openModal(); 
              }
          });
        }
      this.setState({images: temp});
    }.bind(this));
  }

  render() {
    return (  
      <div>
      tests
      </div>
    
    );
  }
 
}
export default App;

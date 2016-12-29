import React, { Component } from 'react';
import '../css/Photos.css';
import { ReactRpg } from 'react-rpg';
import FontAwesome from 'react-fontawesome';
import Logo from '../assets/logo.png';
import Modal from 'react-modal';
import $ from 'jquery';

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
    width                 : 'auto',
    maxWidth              : '85%',
    minWidth              : '75%',
    height                : 'auto',
    maxHeight             : '85%',
    overflow              : 'auto',
    padding               : '0',
    transform             : 'translate(-50%, -50%)'
  }
};

let getParameterByName = function(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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

let map_location = {};
let map_id = {};
let map_desc = {};

class Photos extends Component {
  
  constructor(props) {
		super(props);
    this.state = {
                  username: "daostephen",
                  alias: "@tmizzle2005",
                  images: [],
                  modalIsOpen: false,
                  currentUrl: "",
                  currentLocation : "",
                  description : ""
    };
    if(getParameterByName("id")) {
      $.get('https://daowebapi.herokuapp.com/user/images/' + getParameterByName("id")).done(function(data) {
        this.setState({currentUrl: data.url, currentLocation: data.location, description: data.description});
        this.openModal();
        document.title = data.description;
        $('meta[name=og\\:image]').attr('content', data.url);
        $('meta[name=og\\:title]').attr('content', map_location[hashCode(data.url)]);
      }.bind(this));
    }
    
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
    window.history.pushState("Photo Page", "DaoGatech", "/photos");
    document.title = "DaoGatech";
  }

	componentWillMount() {
    $.get('https://daowebapi.herokuapp.com/user/images').done(function(data) {
      let temp = [];
      for(var index = 0; index < data.length; index++) {
          map_location[hashCode(data[index].url)] = data[index].location; 
          map_id[hashCode(data[index].url)] = data[index].id;
          map_desc[hashCode(data[index].url)] = data[index].description;
          temp.push(
            { url : data[index].url ,
              clickHandler: (url, obj) => { 
                this.setState({currentUrl: url, currentLocation: map_location[hashCode(url)], description: map_desc[hashCode(url)]});
                this.openModal(); 
                window.history.pushState("Photo Page", map_location[hashCode(url)] , "/photos?id=" + map_id[hashCode(url)]);
                document.title = map_desc[hashCode(url)];
                $('meta[name=og\\:image]').attr('content', url);
              }
          });
        }
      this.setState({images: temp});
    }.bind(this));
  }

  render() {
    const meta = {
      title: 'Some Meta Title',
      description: 'I am a description, and I can create multiple tags',
      canonical: 'http://example.com/path/to/page',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      }
    };

    return (  
      <div className="App">
        <div className="App-header">
          <div className="nav">
            <div className="left-section">
              <img src={Logo} className="App-logo" alt="logo" /> 
              <div className="app-title">DAOGATECH</div>
            </div>
            <div className="right-section">         
              <button className="nav-buttons"><a className="inside-nav" href="/">Home</a></button>
              <button className="nav-buttons"><a className="inside-nav" href="/photos">Photos</a></button>
              <button className="nav-buttons"><a className="inside-nav" href="/login">Login</a></button>
            </div>
            
          </div>
        </div>
       
        <div className="introduction">
          <div className="left-intro">
             <img className="avatar" src={Logo} alt="avatar"/>
          </div>
          <div className="right-intro">
             <div className="username">{this.state.username}</div>
             <div className="alias">{this.state.alias}</div>
             <div className="info"><strong>{this.state.images.length}</strong> posts</div>
          </div>
         
        </div>
        <div className="gallery">
          <ReactRpg imagesArray={this.state.images} columns={[ 1, 2, 3 ]} padding={20} />
        </div>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal.bind(this)}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
          contentLabel="Photo"
        >
        <div className="left-side-modal">
          {this.state.currentUrl && <img className="main-img" alt="pic" src={this.state.currentUrl} /> }
        </div>
        <div className="right-side-modal">
          <div className="imgHeader">
             <img src={Logo} alt="avatar"/>
             <div className="rightDesc">
                <div className="topRightDesc">
                {this.state.username}
                </div>
                <div className="bottomRightDesc">
                 <FontAwesome
                    name='home'
                    size='lg'
                    className='icons'
                  />
                  &nbsp;
                {this.state.currentLocation}
                </div>
             </div>
          </div>
          <div className="imgDesc">
          <FontAwesome
            name='quote-left'
            size='lg'
            className='icons'
          />
          &nbsp;
         {this.state.description} 
          &nbsp;
          <FontAwesome
            name='quote-right'
            size='lg'
            className='icons'
          />
          </div>
          
        </div>
        </Modal>
      
      </div>
    
    );
  }
 
}
export default Photos;

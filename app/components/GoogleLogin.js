import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';


// const AUTHENTICATED = 'AUTHENTICATED'
// //Synch  action creator
// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })
//asychronous database call, firebase version?

// let loggedIn = false

export class GoogleLogin extends Component {
	constructor() {
	  super()
	  this.state = {
	  	loggedIn: false,
	  	displayName: ''
	  }
	  this.signIn = this.signIn.bind(this)
  }
  //this.props.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))

  componentDidMount() { // loads the database message
	    //console.log("XXX**** WERE IN GoogleLogin componentDidMount")
			this.props.auth.onAuthStateChanged(firebaseUser => {
					this.setState({
						loggedIn: (null !== firebaseUser)
					})
					if(this.state.loggedIn){
						//console.log("XX**USER is loggedin--DID MOUNT user.displayName is", firebaseUser.displayName)
						this.setState({
							displayName: firebaseUser.displayName,
							photoURL: firebaseUser.photoURL
						})
					} else{
						this.setState({displayName: ''})
					}
			})	
	}
	signIn(){
		//console.log("IN THE SIGN IN FUNCTION")
		var provider = new firebase.auth.GoogleAuthProvider();
  	this.props.auth.signInWithPopup(provider);
	}
	signOut(){
		//console.log("***AABOUT TO SIGN OUT of account user:",user)
		this.props.auth.signOut();
	}
	

	onAuthStateChanged(user) {
		if (user) { // User is signed in!
	    // Get profile pic and user's name from the Firebase user object.
	    var profilePicUrl = user.photoURL;   // TODO(DEVELOPER): Get profile pic.
	    var userName = user.displayName;        // TODO(DEVELOPER): Get user's name.

	    // Set the user's profile pic and name.
	    //this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
	    this.userName.textContent = userName;

	    // We load currently existing chant messages.
	    this.loadMessages();
	  }
	}
	render() {
        var loginOrOut;
        if (this.state.loggedIn) {
            loginOrOut = 
            <div>
	            <div id="user-pic"><img src={this.state.photoURL}></img></div>
		        	<div id="user-name">{this.state.displayName}</div>
	            <button  id="sign-out" 
			        	className="mdl-button mdl-js-button mdl-js-ripple-effect "
			        	onClick={() => this.signOut() }
			        	>
			          Sign-out
			        </button>
		        </div>
        } else {
            loginOrOut = 
            <div>
	            <button  id="sign-in" 
	            className="mdl-button mdl-js-button mdl-js-ripple-effect "
	            onClick={()=> this.signIn() }>
	 	          <i className="material-icons">account_circle</i>Sign-in with Google
	 	        	</button>
	 	        </div>
        }
    return (
    		<div className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
	        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
		      <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
		        <h3>
			        <i className="material-icons">chat_bubble_outline</i> 
			        This is Capstone Game
		        </h3>
		      </div>
		      <div id="user-container">
		        {loginOrOut}
		      </div>
		    </div>
	    </div>
        )
    }
};

 // <span>
 //                <nav className="navbar navbar-default navbar-static-top">
 //                    <div className="container">
 //                        <div className="navbar-header">
 //                            <Link to="/" className="navbar-brand">
 //                                PROJECT NAME
 //                            </Link>
 //                        </div>
 //                        
 //                    </div>
 //                </nav>
 //                <div className="container">
 //                    <div className="row">
 //                        {this.props.children}
 //                    </div>
 //                </div>
 //            </span>
///****
//   render() {
//   	var 
//   	return (
// 	  <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
// 	      <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
// 	        <h3><i className="material-icons">chat_bubble_outline</i> This is Capstone Game</h3>
// 	      </div>
// 	      <div id="user-container">

// 	        <div  id="user-pic"></div>
// 	        <div  id="user-name"></div>
// 	        <button  id="sign-out" 
// 	        	className="mdl-button mdl-js-button mdl-js-ripple-effect "
// 	        	onClick={() => onAuthStateChanged(user)}
// 	        	>
// 	          Sign-out
// 	        </button>

// 	        <button  id="sign-in" className="mdl-button mdl-js-button mdl-js-ripple-effect ">
// 	          <i className="material-icons">account_circle</i>Sign-in with Google
// 	        </button>

// 	      </div>
// 	    </div>
//     )}
// }

import {connect} from 'react-redux'

export default connect (
  state => ({}),
  null,
) (GoogleLogin)






	
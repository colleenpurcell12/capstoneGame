import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';

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
    return (
          <Toolbar>
  					{ this.state.loggedIn ?
  						<ToolbarGroup style={{marginLeft:'50%'}}>
  							<ToolbarTitle text={`🌎🚀👽 Welcome to Pioneers of Mars, ${this.state.displayName.split(" ")[0]}.`} style={{textAlign:'center'}} />
  							<Avatar src={this.state.photoURL} />
  							<IconMenu
				        	iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				        	>
				        		<MenuItem primaryText="Sign out" onClick={() => this.signOut()}/>
				      	</IconMenu>
			      	</ToolbarGroup>
  						:
  						<ToolbarGroup style={{marginLeft:'50%'}}>
  							<ToolbarTitle text={`Are you ready to pioneer?`} />
  							<RaisedButton label='Login with Google' primary={true} onClick={()=> this.signIn() } />
  						</ToolbarGroup>
  					}
      		</Toolbar>
        )
    }
};

import {connect} from 'react-redux'

export default connect (
  state => ({}),
  null,
) (GoogleLogin)








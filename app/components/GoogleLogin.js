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

export class GoogleLogin extends Component {
	constructor() {
	  super()
	  this.signIn = this.signIn.bind(this);
	  this.signOut = this.signOut.bind(this);

  }

  	componentDidMount() { 
	   this.props.fetchCurrentUser();
	}
	signIn(){
		var provider = new firebase.auth.GoogleAuthProvider();
		this.props.auth.signInWithPopup(provider);
	}
	signOut(){
		this.props.auth.signOut();
	}

	render() {
    return (
          <Toolbar>
  					{ this.props.loggedInUser && this.props.loggedInUser.displayName ?
  						<ToolbarGroup style={{marginLeft:'50%'}}>
  							<ToolbarTitle text={`🌎🚀👽 Welcome to Pioneers of Mars, ${this.props.loggedInUser.displayName.split(" ")[0]}.`} style={{textAlign:'center'}} />
  							<Avatar src={this.props.loggedInUser.photoURL} />
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


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'
import { fetchCurrentUser } from '../reducers/login'

const mapState = ({ loggedInUser }) => ({ loggedInUser })

const mapDispatch = { fetchCurrentUser }

export default connect(mapState, mapDispatch)(GoogleLogin);




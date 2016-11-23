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
import {Nav, Grid, Row, Col} from 'react-bootstrap';
import DropDownMenu from 'material-ui/DropDownMenu';
export class GoogleLogin extends Component {
	constructor() {
	  super()
	  this.signIn = this.signIn.bind(this);
	  this.signOut = this.signOut.bind(this);

  }

	signIn(){
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	}
	signOut(){
		firebase.auth().signOut();
	}

	render() {
    return (
            <div>
  					{ this.props.loggedInUser && this.props.loggedInUser.displayName ?
                <Toolbar>
      						<ToolbarGroup style={{textAlign:'center', display: 'inline-block', margin: '0 auto'}}>
      							<ToolbarTitle text={`🌎🚀👽 Welcome to Pioneers of Mars, ${this.props.loggedInUser.displayName.split(" ")[0]}.`} style={{textAlign:'center'}} />
                    <Avatar src={this.props.loggedInUser.photoURL}/>
                    <IconMenu
                      iconButtonElement={<IconButton ><p>⚛</p></IconButton>}
                    >
    				        		<MenuItem primaryText="Sign Out" onClick={() => this.signOut()}/>
    				      	</IconMenu>
    			      	</ToolbarGroup>
                </Toolbar>
  						:
                <Toolbar>
      						<ToolbarGroup style={{textAlign:'center', display: 'inline-block', margin: '0 auto'}}>
      							<ToolbarTitle text={`Are you ready to pioneer?`} />
      							<RaisedButton label='Login with Google' primary={true} onClick={()=> this.signIn() } />
      						</ToolbarGroup>
                </Toolbar>
  					}
      		</div>
        )
    }
};


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'

const mapState = ({ loggedInUser }) => ({ loggedInUser })

export default connect(mapState, null)(GoogleLogin);




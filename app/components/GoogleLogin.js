import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Nav, Grid, Row, Col} from 'react-bootstrap';
import DropDownMenu from 'material-ui/DropDownMenu';

export class GoogleLogin extends Component {
	constructor() {
	  super()
    this.state = {
        rulesOpened: false
      }
	  this.signIn = this.signIn.bind(this);
	  this.signOut = this.signOut.bind(this);
    this.toggleRules = this.toggleRules.bind(this);
    this.closeRules = this.closeRules.bind(this);

  }
  componentDidMount() {
	 this.props.listenToAuth();
	}
	signIn(){
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	}
	signOut(){
		firebase.auth().signOut();
	}

  toggleRules(){
    this.setState({rulesOpened: !this.state.rulesOpened});
  }

  closeRules(){
    this.setState({rulesOpened: false});
  }

	render() {
    return (
            <div>
  					{ this.props.loggedInUser && this.props.loggedInUser.displayName ?
                <Toolbar>
                  <ToolbarGroup>
                    <FlatButton label="Rules" primary={true} style={{textAlign:'left'}}
                      onTouchTap={() => this.toggleRules}
                    />
                    <Drawer
                      docked={false}
                      width={200}
                      open={this.state.rulesOpened}
                      onRequestChange={(open) => this.setState({rulesOpened: !open})}
                    >
                      <MenuItem onTouchTap={() => this.closeRules()}>Rule the First</MenuItem>
                      <MenuItem onTouchTap={() => this.closeRules()}>Rule the Second</MenuItem>
                    </Drawer>

                  </ToolbarGroup>
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
import { listenToAuth } from '../reducers/login'

const mapState = ({ loggedInUser }) => ({ loggedInUser })

const mapDispatch = { listenToAuth }

export default connect(mapState, mapDispatch)(GoogleLogin);




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
import {Card, CardHeader, CardText} from 'material-ui/Card';

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
                <Toolbar style={{backgroundColor:'#E64A19'}}>

                  <ToolbarGroup>

									<FlatButton label="About" primary={true} style={{textAlign:'left', color:'#FFF3E0'}}
                      onClick={() => this.toggleRules()}
                    />
                    <Drawer
                      docked={false}
                      width={250}
                      open={this.state.rulesOpened}
                      onRequestChange={() => this.closeRules()}
                    >
			                  <Card>
												  <CardHeader title='Overview' actAsExpander={true} showExpandableButton={true} />
			                    <CardText expandable={true}>
			                      <div>Welcome to Pioneers of Mars! The year is 2024 and Elon Musk's SpaceX project has succeeded. A batch of people are rocketed off to Mars to start settlement.
			                      </div><br/>
			                      <div> Pioneers of Mars is a four-player game of expansion. Mars is strangly split up into hexagonal terrains that yield different resources (crops, fuel, iron, ice, and solar energy). Trade and use your precious resources to build structures and expand your territory. Sabotage others by stealing a resource on lucky 7 rolls and move the 'Alien' thief onto other terrains to block others from collecting resources on subsequent rolls. The first player to gain 10 Victory points wins the game!
			                      </div><br/>
			                      <div> The game follows the same rules as Settlers of Catan. If you're new to the board game or need to brush up, click on the How To Play tab below and you'll be directed to step-by-step instructions.
			                      </div>
			                    </CardText>
			                 </Card>
			                  <a href='http://www.wikihow.com/Play-Settlers-of-Catan' target='_blank' style={{textDecoration: 'none', color:'black'}}><Card><CardHeader title='How To Play' /></Card></a>
			                  <a href='https://github.com/colleenpurcell12/capstoneGame#readme' target='_blank' style={{textDecoration: 'none', color:'black'}}><Card><CardHeader title='Code on GitHub' /></Card></a>
			                  <Card><CardHeader title='Dev Team' actAsExpander={true} showExpandableButton={true} />
			                    <CardText expandable={true}>
			                      <ul style={{listStyleType: 'none'}}>
			                        <li style={{color:'#E64A19'}}>Sharon Choe |<a href='https://www.linkedin.com/in/sharonchoe' target='_blank' style={{textDecoration: 'none'}}> <i className="fa fa-linkedin" aria-hidden="true" style={{color:'1c87bd'}}></i></a></li>
			                        <li style={{color:'#E64A19'}}>Deborah Kwon |<a href='https://www.linkedin.com/in/deborah-kwon' target='_blank' style={{textDecoration: 'none'}}> <i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
			                        <li style={{color:'#E64A19'}}>Samantha Lugar |<a href='https://www.linkedin.com/in/samanthalugar' target='_blank' style={{textDecoration: 'none'}}> <i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
			                        <li style={{color:'#E64A19'}}>Colleen Purcell |<a href='https://www.linkedin.com/in/colleenpurcell' target='_blank' style={{textDecoration: 'none'}}> <i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
			                      </ul>
			                    </CardText>
			                  </Card>
                    </Drawer>
                  </ToolbarGroup>
      						<ToolbarGroup style={{textAlign:'center', display: 'inline-block', margin: '0 auto'}}>
      							<ToolbarTitle text={`Welcome to Pioneers of Mars, ${this.props.loggedInUser.displayName.split(" ")[0]}.`} style={{textAlign:'center', color:'#FFF3E0'}} />
                    <Avatar src={this.props.loggedInUser.photoURL}/>
                    <IconMenu
                      iconButtonElement={<IconButton ><p>🚀</p></IconButton>}
                    >
    				        		<MenuItem primaryText="Sign Out" onClick={() => this.signOut()}/>
    				      	</IconMenu>

    			      	</ToolbarGroup>
									<ToolbarGroup>
										<FlatButton label="Home" primary={false} style={{textAlign:'left', color:'#FFF3E0'}}
											href='/' hoverColor='#E64A19'
										/>
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

export { GoogleLogin as PureGoogleLogin }; //this is for testing, do not remove unless updating test suite

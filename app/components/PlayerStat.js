import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';

import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import store from '../store'
import {addAction} from '../reducers/action-creators';
import {startGame} from '../reducers/home';
import {newDiceRoll} from '../reducers/dice';
import {addMessage} from '../reducers/chatroom';
import {initials} from '../reducers/helperFunctions';
//needs to know which player's card is showing
import Structures from './Structures';
import { addPlayer, incrementResource, decrementResource } from '../reducers/players';


const validate = values => {
  const errors = {}
  const requiredFields = [  ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

export class PlayerStat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giveTo: 'Player',
      giveResource: 'Resource',
      giveNumber: "",
      errorText: ''
    }
    this.changeCount = this.changeCount.bind(this)
    this.addNewPlayer = this.addNewPlayer.bind(this)
    this.submitGiveForm = this.submitGiveForm.bind(this)

  }

  changeCount(resource, isGoingUp){
    isGoingUp? addAction(incrementResource(this.props.loggedInUser.displayName, resource, 1)) : //passing along 1 as the 'count' for standard increment or decrement via +/- buttons
      addAction(decrementResource(this.props.loggedInUser.displayName, resource, 1))
  }

  submitGiveForm(giveState){
    let {players, loggedInUser} = this.props;
    //if not a number, display error message
    if(isNaN(parseFloat(this.state.giveNumber))) {
      this.setState({errorText: "Invalid number"})
      return;
    }
    let station = "Space Station";
    let message;
    let actualGiveNumber = +giveState.giveNumber; //initially set to the passed number

    for (var i = 0; i < players.length; i++) {
      if(players[i].name === loggedInUser.displayName && giveState.giveNumber > players[i].cardsResource[giveState.giveResource]) {
        return this.setState({errorText: "Not enough resource"})
      }
    }

    if(giveState.giveTo === "Bank" && giveState.giveResource !== 'Resource') {
      addAction(decrementResource(loggedInUser.displayName, giveState.giveResource, actualGiveNumber))
      return;
    }

    else if (actualGiveNumber > 0 && giveState.giveResource !== 'Resource' && giveState.giveTo !== 'Player') { //if the number of cards being distributed is greater than zero and selected values are not default ones, fire these
      addAction(decrementResource(this.props.loggedInUser.displayName, giveState.giveResource, actualGiveNumber));
      addAction(incrementResource(giveState.giveTo, giveState.giveResource, actualGiveNumber));
      message = {
        name: station,
        text: `${initials(this.props.loggedInUser.displayName)} sent ${initials(giveState.giveTo)} ${actualGiveNumber} of their ${giveState.giveResource}`
      }
      this.props.addMessage(message);
    }
  }

  addNewPlayer(){
     if (this.props.players.length === 3){ //if we're on the third player, and now we're calling addNew Player
      addAction(startGame(true)); //set game progress to be true
    }
       addAction(addPlayer(this.props.loggedInUser.displayName)); //, color));
  }

  render() {
    var resource, points;
    this.props.players.forEach((player, idx) => {
      if(player.name === this.props.loggedInUser.displayName) {
        resource = this.props.players[idx].cardsResource
        points = this.props.players[idx].points
      }
    });
    return (
      <div className='playerInfo'>
        {resource ?
        <div>
          <div><strong>Victory Points:</strong> {points}</div>

          <br />

          <div><Structures /></div>

          <br />

          <div>
          <i className="fa fa-minus-square" aria-hidden="true" onClick={() => this.changeCount('crops',false) }></i>
          &nbsp;
          {resource.crops}
          &nbsp;
          <i className="fa fa-plus-square" aria-hidden="true" onClick={ () => this.changeCount('crops',true) }></i>
            &nbsp; 🌽Crop Greenhouse
          </div>

          <div>
          <i className="fa fa-minus-square" aria-hidden="true" onClick={() => this.changeCount('fuel',false) }></i>
          &nbsp;
            {resource.fuel}
          &nbsp;
          <i className="fa fa-plus-square" aria-hidden="true" onClick={ () => this.changeCount('fuel',true) }></i>
            &nbsp; 🚀Fuel Factory
          </div>

          <div>
          <i className="fa fa-minus-square" aria-hidden="true" onClick={() => this.changeCount('iron',false) }></i>
          &nbsp;
          {resource.iron}
          &nbsp;
          <i className="fa fa-plus-square" aria-hidden="true" onClick={ () => this.changeCount('iron',true) }></i>
            &nbsp; 🌑Iron Ore Mine
          </div>

          <div>
          <i className="fa fa-minus-square" aria-hidden="true" onClick={() => this.changeCount('ice',false) }></i>
          &nbsp;
          {resource.ice}
          &nbsp;
          <i className="fa fa-plus-square" aria-hidden="true" onClick={ () => this.changeCount('ice',true) }></i>
            &nbsp; ❄️Ice
          </div>

          <div>
          <i className="fa fa-minus-square" aria-hidden="true" onClick={() => this.changeCount('solar',false) }></i>
          &nbsp;
          {resource.solar}
          &nbsp;
          <i className="fa fa-plus-square" aria-hidden="true" onClick={ () => this.changeCount('solar',true) }></i>
            &nbsp; 🔆Solar Panels
          </div>
          <br />
          <Card style={{maxWidth: '75%'}}>
            <CardHeader title='Reference' actAsExpander={true} showExpandableButton={true} />
              <CardText expandable={true}>
                <table>
                  <thead>
                    <tr><th>Building</th><th>Costs</th><th>VP</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Road</td><td>= ❄️  🔆</td><td>0</td></tr>
                    <tr><td>Settlement</td><td>= ❄️  🔆 🌽  🚀</td><td>1</td></tr>
                    <tr><td>City</td><td>= 🚀 🚀  🌑 🌑 🌑</td><td>2</td></tr>
                    <tr><td>Pioneer</td><td>= 🚀 🌽  🌑</td><td>?</td></tr>
                  </tbody>
                </table>
              </CardText>
          </Card>
            <div style={{border: '1px solid gray', borderRadius: '5px', padding: '0px', marginRight: '15%', marginTop: '5%'}}>
              <div style={{textAlign: 'center', paddingTop: '10px' , fontSize: '18px'}}>Give Resources</div>
              <DropDownMenu value={this.state.giveTo} onChange={(e,i,v) => this.setState({giveTo: v})}>
                <MenuItem disabled={true} value='Player' primaryText="Player" />
                  <MenuItem value="Bank" primaryText="Bank" />
                { this.props.players.map((player,idx) => {
                  if(player.name !== this.props.loggedInUser.displayName) return (
                  <MenuItem value={player.name} primaryText={player.name.split(" ")[0]} key={idx} />
                )})}
              </DropDownMenu>
               <DropDownMenu value={this.state.giveResource} onChange={(e,i,v) => {this.setState({giveResource: v})}} autoWidth={false}>
                 <MenuItem disabled={true} value='Resource' primaryText="Resource" />
                  { Object.keys(resource).map((item, idx) => <MenuItem value={item} primaryText={item} key={idx} />) }
              </DropDownMenu>
                <div style={{paddingLeft:'10%' , fontSize: '16px' }}>
                  <TextField hintText="Number" errorText={this.state.errorText} style={{ width: '70px'}} onChange={(e) => {
                    e.preventDefault();
                    this.setState({giveNumber: e.target.value, errorText: ""});
                    }} />
                  <RaisedButton label="Give" onClick={() => this.submitGiveForm(this.state)} />
                </div>
            </div>

        </div>
        :
        <div>
          { this.props.inProgress?
            <div>
              <div>Game in Progress</div>
            </div>
            :
            <div>
              <button type='submit' onClick={() => this.addNewPlayer()}> Join Expansion </button>
            </div>
          }
        </div>
        }
			</div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';

const mapState = ({ loggedInUser, players, inProgress }) => ({ loggedInUser, players, inProgress }); //userArray, colors

const mapDispatch = { addMessage }; //grabColorFromArray

export default connect(
  mapState,
  mapDispatch
)(PlayerStat)

export { PlayerStat as PurePlayerStat }; //this is for testing, do not remove unless updating test suite

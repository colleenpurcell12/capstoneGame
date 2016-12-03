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
      giveNumber: 0
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
    let station = "Space Station";
    let message;

    let actualGiveNumber = +giveState.giveNumber; //initially set to the passed number
    this.props.players.map((player, idx) => {
      if (player.name === this.props.loggedInUser.displayName) {
        if (giveState.giveNumber > player.cardsResource[giveState.giveResource]) {//do a check to only remove max   number of cards from player's hand
          actualGiveNumber = player.cardsResource[giveState.giveResource] //if the form giveNumber is greater than what's in the player's hand, then set the actualGiveNumber to the max for that resource
        }
      }
    })

    if (actualGiveNumber > 0) { //if the number of cards being distributed is greater than zero, fire these
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
          <div><strong>Victory Points:</strong> {points}</div><br />

          <div><Structures /><br></br></div>

          <div>
          <input type="button" onClick={() => this.changeCount('crops',false) } value="-"/>
          {resource.crops}
          <input type="button" onClick={ () => this.changeCount('crops',true) } value="+"/>
             🌽Crop Greenhouse
          </div>

          <div>
            <input type="button" onClick={() => this.changeCount('fuel',false) } value="-"/>
            {resource.fuel}
            <input type="button" onClick={ () => this.changeCount('fuel',true) } value="+"/>
              🚀Fuel Factory 
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('iron',false) } value="-"/>
          {resource.iron}
          <input type="button" onClick={ () => this.changeCount('iron',true) } value="+"/>
            🌑Iron Ore Mine    
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('ice',false) } value="-"/>
          {resource.ice}
          <input type="button" onClick={ () => this.changeCount('ice',true) } value="+"/>
            ❄️Ice             
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('solar',false) } value="-"/>
          {resource.solar}
          <input type="button" onClick={ () => this.changeCount('solar',true) } value="+"/>
            🔆Solar Panels
          </div>
          
          <br/>

          <table>
            <thead>
              <tr><th>Structure</th><th>Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>Road</td><td>= ❄️  🔆</td></tr>
              <tr><td>Settlement</td><td>= ❄️  🔆 🌽  🚀</td></tr>
              <tr><td>City</td><td>= 🚀 🚀  🌑 🌑 🌑</td></tr>
              <tr><td>Pioneer</td><td>= 🚀 🌽  🌑</td></tr>
            </tbody>
          </table>

          <div><Structures /><br/></div>

            <div style={{border: '1px solid gray', padding: '0px' , marginRight: '10%'}}>
              <div style={{textAlign: 'center', padding: '10px' , fontSize: '18px'}}>Give Resources</div>
              <DropDownMenu value={this.state.giveTo} onChange={(e,i,v) => this.setState({giveTo: v})}>
                <MenuItem disabled={true} value='Player' primaryText="Player" />
                { this.props.players.map((player,idx) => <MenuItem value={player.name} primaryText={player.name.split(" ")[0]} key={idx} />) }
              </DropDownMenu> 
               <DropDownMenu value={this.state.giveResource} onChange={(e,i,v) => {this.setState({giveResource: v})}} autoWidth={false}>
                 <MenuItem disabled={true} value='Resource' primaryText="Resource" />
                  { Object.keys(resource).map((item, idx) => <MenuItem value={item} primaryText={item} key={idx} />) }
              </DropDownMenu>
                <div style={{paddingLeft:'10%' , fontSize: '16px' }}><input type="text" name="count" placeholder="Number" style={{ width: '70px'}} onChange={(e) => {
                e.preventDefault();
                this.setState({giveNumber: e.target.value});
              }}/>
                <button style={{ margin: '10px', fontSize: '16px'}} onClick={() => this.submitGiveForm(this.state)}>Give</button>
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

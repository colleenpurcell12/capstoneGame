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
import {addPlayer, incrementResource, decrementResource} from '../reducers/players';
import {addAction} from '../reducers/action-creators';
import {startGame} from '../reducers/home';
import {newDiceRoll} from '../reducers/dice';
import {addMessage} from '../reducers/chatroom';
import {initials} from '../reducers/helperFunctions';
//needs to know which player's card is showing
import Structures from './Structures';


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

  handleChange (e) { //TODO fill in this onClick handler for awards selection
    //console.log(e.target.value) //name of input
    //need to grab the "current user" and give them the award in the database
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
      addAction(decrementResource(this.props.loggedInUser.displayName, giveState.giveResource, actualGiveNumber)); //decrease the giver's resources by the appropriate amount
      addAction(incrementResource(giveState.giveTo, giveState.giveResource, actualGiveNumber)); //give the recipient only the amount of resources that the giver could provide

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
      addAction(addPlayer(this.props.loggedInUser.displayName)); //add the player to the game
  }

  nextPlayer(){
    let { isFirstRound, isSettingUp, turnArray, userArray, turnInfo } = this.props
    if (isSettingUp === false){ //Normal cycle of turns during game play, increment user to x+1
      var player = this.props.turnInfo
      player === 4 ? player = 1 : player++
      addAction(setNextTurn(player)); //Formerly endTurn(userID) //dispatched setNextTurn(player));
    }
    else { //isSettingUp === true, tracks 1st and 2nd round, ascending then descending
      //check if end of 1st round
      if (isFirstRound === true && turnArray.length === 1){
        //reset all the userArray hasBoughtARoad and hasBoughtASettlement to false
        for (var i = 0; i<4 ; i++){ //players 1 through 4
            userArray[i].hasBoughtARoad = false;
            userArray[i].hasBoughtASettlement = false
        }
        addAction(nextRound())
        addAction(nextRoundStep2())
        addAction(setNextTurn(4));
        }
      //check if end of 2nd round, therefore end of set up phase
      else if (isFirstRound === false && turnArray.length === 1) {  // initialize normal cycle of turns
        addAction(setNextTurn(1))       //Formerly this.props.endTurn(0) dispatched setNextTurn(1)
        addAction(startNormGamePlay()) //this.props.endSetUp() dispatched startNormGamePlay(), which sets isSettingUp ==false
      }
      else { //within either round
        if (turnArray){
          let player1 = turnArray[0]
          //if (isFirstRound === false){ player1--;} //endTurn increments the #
          addAction(shiftTurns()) //Formerly this.props.nextTurn() dispatched shiftTurns()
          addAction(setNextTurn(player1)) // this.props.endTurn(player1) dispatched setNextTurn(player)
        } else { console.log("turnArray is undefined:",turnArray) }
      }
    }
  }

  render() {
    var resource;
    this.props.players.forEach((player, idx) => {
      if(player.name === this.props.loggedInUser.displayName) {
        resource = this.props.players[idx].cardsResource
      }
    });
    return (
      <div className='playerInfo'>
        {resource ?
        <div>

          <div>
          <input type="button" onClick={() => this.changeCount('crops',false) } value="-"/>
             Crops  {resource.crops}
          <input type="button" onClick={ () => this.changeCount('crops',true) } value="+"/>
          </div>

          <div>
            <input type="button" onClick={() => this.changeCount('fuel',false) } value="-"/>
              Fuel    {resource.fuel}
            <input type="button" onClick={ () => this.changeCount('fuel',true) } value="+"/>
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('hematite',false) } value="-"/>
            Hematite    {resource.hematite}
          <input type="button" onClick={ () => this.changeCount('hematite',true) } value="+"/>
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('ice',false) } value="-"/>
            Ice             {resource.ice}
          <input type="button" onClick={ () => this.changeCount('ice',true) } value="+"/>
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('solar',false) } value="-"/>
            Solar {resource.solar}
          <input type="button" onClick={ () => this.changeCount('solar',true) } value="+"/>
          </div>

          <div>
            <br></br>
            <label>
                <input type="radio" value="army" onChange={this.handleChange}/>
                Largest Army Award
            </label>
            <br></br>
            <label>
                <input type="radio" value="road" onChange={this.handleChange} />
                Longest Road Award
            </label>
          </div>

          <br></br>
          <div><Structures /><br></br></div>
          <button type='submit' onClick={() => this.nextPlayer()}> Done with Turn </button><br /><br />

            <div style={{border: '1px solid gray', padding: '0', marginRight: '10%'}}>
              <h6 style={{textAlign: 'center'}}>Give Resources</h6>
              <DropDownMenu value={this.state.giveTo} onChange={(e,i,v) => this.setState({giveTo: v})}>
                <MenuItem disabled={true} value='Player' primaryText="Player" />
                { this.props.players.map((player,idx) => <MenuItem value={player.name} primaryText={player.name.split(" ")[0]} key={idx} />) }
              </DropDownMenu> <br />
               <DropDownMenu value={this.state.giveResource} onChange={(e,i,v) => {this.setState({giveResource: v})}} autoWidth={false}>
                 <MenuItem disabled={true} value='Resource' primaryText="Resource" />
                  { Object.keys(resource).map((item, idx) => <MenuItem value={item} primaryText={item} key={idx} />) }
              </DropDownMenu>
                <div style={{paddingLeft:'10%'}}><br /><input type="text" name="count" placeholder="Number to..." style={{ width: '70px'}} onChange={(e) => {
                e.preventDefault();
                this.setState({giveNumber: e.target.value});
              }}/>
                <button onClick={() => this.submitGiveForm(this.state)}>Give</button>
                </div>
            </div>
          <div> Expansion Materials: </div>
            <table>
            <tbody>
                  <tr>  <th>Structure </th> <th>Cost                </th></tr>
                  <tr> <td>Road      </td> <td>= ❄️  🔆            </td> </tr>
                  <tr> <td>Settlement</td> <td>= ❄️  🔆 🌽  🚀    </td> </tr>
                  <tr> <td>City      </td> <td>= 🚀 🚀  🌑 🌑 🌑</td> </tr>
                  <tr> <td>Pioneer   </td> <td>= 🚀 🌽  🌑       </td> </tr>
            </tbody>
            </table>
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
//import { endTurn } from '../reducers/playerStat';
//import { setNextRound, endSetUp, nextTurn } from '../reducers/turnBooleans';
import { setNextTurn } from '../reducers/playerStat';
import { nextRound, nextRoundStep2, shiftTurns, startNormGamePlay } from '../reducers/turnBooleans';


const mapState = ({ turnInfo, loggedInUser, players, inProgress, isFirstRound, isSettingUp, turnArray, userArray }) => ({turnInfo, loggedInUser, players, inProgress, isFirstRound, isSettingUp, turnArray, userArray});

const mapDispatch = {  setNextTurn, nextRound, nextRoundStep2, shiftTurns, startNormGamePlay, addMessage };
// In first round -- nextTurn->shiftTurns
// at the end of first round-- ->nextRound switches isFirstRound to false and ->nextRoundStep2 resets the 2nd round's turnArray
// In 2nd round -- nextTurn->shiftTurns
// at the end of 2nd round-- endSetUp->startNormGamePlay
// Normal game play -- endTurn->setNextTurn


// setNextRound -> nextRound & nextRoundStep2  //export const setNextRound = () =>  dispatch(nextRound());(nextRoundStep2());
// nextTurn -> shiftTurns           //export const nextTurn = () => dispatch(shiftTurns());
// endSetUp -> startNormGamePlay    // export const endSetUp = () => dispatch(startNormGamePlay());
// endTurn -> setNextTurn           // export const endTurn = (player) => dispatch(setNextTurn(player));


export default connect(
  mapState,
  mapDispatch
)(PlayerStat)

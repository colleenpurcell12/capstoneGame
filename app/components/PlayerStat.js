import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';

import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import store from '../store'
import {addPlayer, incrementResource, decrementResource} from '../reducers/players';
import {addAction} from '../reducers/action-creators';
import {startGame} from '../reducers/home';
import {newDiceRoll} from '../reducers/dice';
//needs to know which player's card is showing

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
    this.changeCount = this.changeCount.bind(this)
    this.addNewPlayer = this.addNewPlayer.bind(this)
  }

  changeCount(resource, isGoingUp){
    isGoingUp? addAction(incrementResource(this.props.loggedInUser.displayName, resource)) :
      addAction(decrementResource(this.props.loggedInUser.displayName, resource))
  }

  handleChange (e) {
    //console.log(e.target.value) //name of input
    //need to grab the "current user" and give them the award in the database
  }

  addNewPlayer(){
     if (this.props.players.length === 3){ //if we're on the third player, and now we're calling addNew Player
      addAction(startGame(true)); //set game progress to be true
    }
      addAction(addPlayer(this.props.loggedInUser.displayName)); //add the player to the game
  }

  nextPlayer(){
    let { isFirstRound, isSettingUp, turnArray, userArray } = store.getState()
     //Normal cycle of turns during game play, increment user to x+1
    if (isSettingUp === false){
      this.props.endTurn(this.props.turnInfo) //dispatch(setNextTurn(player));
    }
    //isSettingUp === true, tracks 1st and 2nd round, ascending then descending
    else {
      //check if end of 1st round
      if (isFirstRound === true && turnArray.length === 1){
        //reset all the userArray hasBoughtARoad and hasBoughtASettlement to false
        for (var i = 0; i<4 ; i++){
            userArray[i].hasBoughtARoad = false;
            userArray[i].hasBoughtASettlement = false
        }
        this.props.setNextRound() //dispatch(nextRound()); //which sets whoseTurn to 4, turnArray to [3,2,1]) and isFirstRound = false
        this.props.endTurn(3) //to 4
        }
      //check if end of 2nd round, therefore end of set up phase
      else if (isFirstRound === false && turnArray.length === 1) {  // initialize normal cycle of turns
        this.props.endTurn(0)
        this.props.endSetUp()  //dispatch(startNormGamePlay()); sets turnInfo to 1, isSettingUp ==false
      }
      else { //within either round
        if (turnArray){
          let player1 = turnArray[0]
          if (isFirstRound === false){ player1--;} //endTurn increments the #
          this.props.nextTurn()
          this.props.endTurn(player1) //dispatch(setNextTurn(player));
        }
        else { console.log("turnArray is undefined") }
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
      <div>
        {resource ?
        <div>
          <div>
            <input type="button" onClick={() => this.changeCount('wool',false) } value="-"/>
            Wool    {resource.wool}
            <input type="button" onClick={ () => this.changeCount('wool',true) } value="+"/>
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('brick',false) } value="-"/>
           Brick  {resource.brick}
          <input type="button" onClick={ () => this.changeCount('brick',true) } value="+"/>
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('grain',false) } value="-"/>
           Grain  {resource.grain}
          <input type="button" onClick={ () => this.changeCount('grain',true) } value="+"/>
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('ore',false) } value="-"/>
          Ore    {resource.ore}
          <input type="button" onClick={ () => this.changeCount('ore',true) } value="+"/>
          </div>

          <div>
          <input type="button" onClick={() => this.changeCount('lumber',false) } value="-"/>
          Lumber {resource.lumber}
          <input type="button" onClick={ () => this.changeCount('lumber',true) } value="+"/>
          </div>


        <div >
          <label>
              <input type="radio"
                value="army"
                onChange={this.handleChange}
              />
            Largest Army Award
          </label>
          <br></br>
          <label>
              <input type="radio"
              value="road"
              onChange={this.handleChange}
              />
              Longest Road Award
            </label>
          </div>

          <br></br>

          <div> Building materials: </div>
          <table>
          <tbody>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
                <tr>
                  <td>Road</td>
                  <td>=1B+1L</td>
                </tr>
                <tr>
                  <td>Settlement</td>
                  <td>=1L+1B+1G+1W </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>=2W+3O</td>
                </tr>
                <tr>
                  <td>Developer</td>
                  <td>=1W+1G+1O </td>
                </tr>
          </tbody>
          </table>

  				<button type='submit' onClick={() => this.nextPlayer()}> Done with Turn </button>
        </div>
        :
        <div>
        {this.props.inProgress?
          <div>
            <div>Game in Progress</div>
          </div>
          :
          <div>
            <button type='submit' onClick={() => this.addNewPlayer()}> JOIN GAME </button>
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
import { endTurn } from '../reducers/playerStat'; //bring in our setDiceRoll dispatcher, which will literally just dispatch newDiceRoll
import { setNextRound, endSetUp, nextTurn } from '../reducers/turnBooleans';

//bring in other results from reducers as necessary like isSettingUp, isFirstRound...

const mapState = ({ turnInfo, loggedInUser, players, inProgress }) => ({turnInfo, loggedInUser, players, inProgress});
const mapDispatch = { endTurn, setNextRound, endSetUp, nextTurn };

export default connect(
  mapState,
  mapDispatch
)(PlayerStat)

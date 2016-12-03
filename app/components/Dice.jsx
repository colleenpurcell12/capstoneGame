import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {addAction} from '../reducers/action-creators';
import { newDiceRoll } from '../reducers/dice';
import {incrementResource, decrementResource} from '../reducers/players';
import {addMessage} from '../reducers/chatroom';
import {initials} from '../reducers/helperFunctions';
import { setNextTurn } from '../reducers/playerStat';
import { nextRound, nextRoundStep2, shiftTurns, startNormGamePlay } from '../reducers/turnBooleans';
import { clearSelection } from '../reducers/selection'
import { deal, setupDeal} from 'APP/gameutils/deal'


export class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stealFrom: "Player"
    }
    this.rollDice = this.rollDice.bind(this);
    this.submitStealInfo = this.submitStealInfo.bind(this);
  }

  rollDice(bool) {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    let total = d1+d2 
    var dealt = deal(this.props.structure, this.props.corners, this.props.hexData, total)
    if (d1 === d2) {
      return {d1: d1, d2: d2, diceEnabled: true, stealEnabled: false};
    }  
    else if (total === 7){ //if you roll a 7
      return {d1: d1, d2: d2, diceEnabled: false, stealEnabled: true}; //allow stealing
    }    
    else {
      return {d1: d1, d2: d2, diceEnabled: false, stealEnabled: false}; //return the object that will be stored on the state since all the calcs are done in this function
    }
  }

  submitStealInfo(playerToRob) {
    if(playerToRob === "Player" || !this.props.players[playerToRob].cardsTotal()) return; //if player has no cards, immediately return to avoid infinite loop
    let resources = ["crops", "ice", "solar", "iron", "fuel"];
    let randomResource;
    let theftCall = 0; //only allow for one steal
    let setToStealFrom = this.props.players[playerToRob].cardsResource //player's available resources

    while (theftCall === 0){ //while nothing has been stolen yet
      randomResource = resources[Math.floor(Math.random() * 5)]; //set randomResource to a random index 0-4
      if (setToStealFrom[randomResource] > 0){ //if the person has that card available
        theftCall++; //increment theft call to break out of loop
        addAction(incrementResource(this.props.loggedInUser.displayName, randomResource, 1)); //increase robber's resource
        addAction(decrementResource(this.props.players[playerToRob].name, randomResource, 1)); //remove one card from playerToRob
        let message = {
          name: "Space Station",
          text: `${initials(this.props.loggedInUser.displayName)} stole from ${initials(this.props.players[playerToRob].name)}`
        }
        addAction(newDiceRoll({d1: this.props.diceRoll.d1, d2: this.props.diceRoll.d2, diceEnabled: false, stealEnabled: false}))
        this.props.addMessage(message);
      }
    }
    theftCall = 0; //set theftCall back to default 0 value
  }

  nextPlayer(){
    if(this.props.diceRoll.d1) addAction(newDiceRoll({d1: this.props.diceRoll.d1, d2:  this.props.diceRoll.d2, diceEnabled: true, stealEnabled: false}))
    addAction(clearSelection())
    let { isFirstRound, isSettingUp, turnArray, turnInfo, players } = this.props 
    console.log("Past player is",turnInfo, "isFirstRound",isFirstRound," and turn Array is",turnArray)
    if (isSettingUp === false){ //Normal cycle of turns during game play, increment user to x+1
      var player = this.props.turnInfo
      player === 4 ? player = 1 : player++
      console.log("and next player is",player)
      addAction(setNextTurn(player)); //Formerly endTurn(userID) //dispatched setNextTurn(player));
    }

    else { //isSettingUp, ascending turns in 1st and descending in 2nd round
      if (isFirstRound === true && turnArray.length === 0){
        //Players are allowed a purchase of each, per round.
        for (var i = 0; i<4 ; i++){ //4 players
          if(players[i]){
            players[i].hasBoughtARoad = false;
            players[i].hasBoughtASettlement = false
          }
        }
        addAction(nextRound())      // sets !isFirstRound
        addAction(nextRoundStep2()) // sets turnsArray to descending
        addAction(setNextTurn(4));  // starts 2nd round with 4th player
     }
      // At the end of 2nd round, normal game play is initiated
      else if (isFirstRound === false && turnArray.length === 0) {  
        console.log("and next player is 1")
        addAction(setNextTurn(1))      // game starts with the 1st player
        addAction(startNormGamePlay()) // !isSettingUp
        let setupDealt = setupDeal(this.props.structure, this.props.corners, this.props.hexData)
        setupDealt.forEach(incr => {
          addAction(incrementResource(incr.player, incr.resource, incr.num))
        })  
      }
      else { //within either round
        if (turnArray){
          let nextPlayerID = turnArray[0]
          console.log("about to call shiftTurns and setNextTurn with nextPlayerID:",nextPlayerID)
          //if (isFirstRound === false){ player1--;} //endTurn increments the #
          addAction(shiftTurns()) //Formerly this.props.nextTurn() dispatched shiftTurns()
          addAction(setNextTurn(nextPlayerID)) // this.props.endTurn(player1) dispatched setNextTurn(player)
        } else { console.log("turnArray is undefined:", turnArray) }
       }
    }
  }

  render() {
    var total;
    for (var i = 0; i < this.props.players.length; i++) {
      total += this.props.players[i].cardsTotal()
    }
    return (
    	<div className='playerInfo'>

      { this.props.diceRoll.d1 && this.props.diceRoll.d2 ?
        <div>
           <div>Dice roll:{this.props.diceRoll.d1 + this.props.diceRoll.d2}</div>
           <img className="dice" src={`/die/d${this.props.diceRoll.d1}.gif`}/>
           <img className="dice" src={`/die/d${this.props.diceRoll.d2}.gif`}/>
           <br />
           <br />
         </div>
       :
       <div></div>
      }

      { this.props.players.length > 0 && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && this.props.diceRoll.diceEnabled && !this.props.isSettingUp ?

        <button onClick={() => addAction(newDiceRoll(this.rollDice()))}>Roll Dice</button>
          :
        <button type='submit' onClick={() => this.nextPlayer()}> Done with Turn </button>
      }

      { this.props.players.length > 0 && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && this.props.diceRoll.stealEnabled ?

        <div style={{border: '1px solid gray', marginRight: '10%'}}>
          <h6 style={{textAlign: 'center'}}>STEAL FROM PLAYER</h6>
            <DropDownMenu value={this.state.stealFrom} onChange={(e,i,v) => this.setState({stealFrom: v})}>
              <MenuItem disabled={true} value='Player' primaryText="Player" />
              { this.props.players.map((player,idx) => {
                if(player.name !== this.props.loggedInUser.displayName && player.cardsTotal()) 
                  return (
                  <MenuItem value={idx} primaryText={player.name.split(" ")[0]} key={idx} />
                  )
                })
              }
            </DropDownMenu>
          <button onClick={() => addAction(this.submitStealInfo(this.state.stealFrom))}>Steal!</button>
         </div>
          :
        <div></div>
      }

		</div>

    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';

const mapStore = ({ diceRoll, loggedInUser, turnInfo, players, inProgress, corners, hexData, isFirstRound, isSettingUp, turnArray, structure }) => ({diceRoll, loggedInUser, turnInfo, players, inProgress, corners, hexData, isFirstRound, isSettingUp, turnArray, structure })
const mapDispatch = {addMessage};
export default connect(mapStore, mapDispatch)(Dice);

export { Dice as PureDice }; //this is for testing, do not remove unless updating test suite

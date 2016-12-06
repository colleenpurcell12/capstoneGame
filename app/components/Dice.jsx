import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import { addAction } from '../reducers/action-creators';
import { newDiceRoll } from '../reducers/dice';
import { hasNotBought, incrementResource, decrementResource } from '../reducers/players';
import { addMessage} from '../reducers/chatroom';
import { initials  } from '../reducers/helperFunctions';
import { setNextTurn } from '../reducers/playerStat';
import { nextRound, nextRoundStep2, shiftTurns, startNormGamePlay } from '../reducers/turnBooleans';
import { clearSelection } from '../reducers/selection'
import { deal, setupDeal } from 'APP/gameutils/deal'

import Structures from './Structures';


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
    deal(this.props.structure, this.props.corners, this.props.hexData, total).forEach(incr => {
      addAction(incrementResource(incr.player, incr.resource, incr.num))
    })
    if (d1 === d2) {
      return {d1: d1, d2: d2, diceEnabled: true, stealEnabled: false};
    }
    else if (total === 7){ //if you roll a 7
      let message = { name: "Space Station",
        text: `${initials(this.props.loggedInUser.displayName)} rolled a 7! Move the martian by clicking on a destination hex. This will block distribution of resource cards when the die are rolled. Next steal a card from whomever! If any player has more than 7 resource, they have to give up half of them (rounding down).`}
      this.props.addMessage(message);
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
    let { isFirstRound, isSettingUp, turnArray, turnInfo, players } = this.props

    if (isSettingUp && !isFirstRound && turnInfo===2){
      let currPlayer = players[0].name
      addAction( hasNotBought(currPlayer, 'hasBoughtARoad') )
      addAction( hasNotBought(currPlayer, 'hasBoughtASettlement') )
    }

    if(!isSettingUp){
        addAction(newDiceRoll({d1: this.props.diceRoll.d1, d2:  this.props.diceRoll.d2, diceEnabled: true, stealEnabled: false}))
    }
    addAction(clearSelection())

    if (isSettingUp === false){ //Normal cycle of turns during game play, increment user to x+1
      var player = turnInfo
      player === 4 ? player = 1 : player++
      addAction(setNextTurn(player));
    }

    else { //isSettingUp, ascending turns in 1st and descending in 2nd round
      if (isFirstRound === true && turnArray.length === 0){
        //Players are allowed a purchase of each, per round.
        for (var i = 0; i<4 ; i++){ //4 players
          if(players[i]){
            console.log("players[i].name",players[i].name,"about to set to false")
            let currPlayer = players[i].name
             addAction( hasNotBought(currPlayer, 'hasBoughtARoad') )
             addAction( hasNotBought(currPlayer, 'hasBoughtASettlement') )
          }
        }
        addAction(nextRound())      // sets !isFirstRound
        addAction(nextRoundStep2()) // sets turnsArray to descending
        addAction(setNextTurn(4));  // starts 2nd round with 4th player
     }
      // At the end of 2nd round, normal game play is initiated
      else if (isFirstRound === false && turnArray.length === 0) {
        //console.log("and next player is 1")
        addAction(setNextTurn(1))      // game starts with the 1st player
        addAction(startNormGamePlay()) // set !isSettingUp
        addAction(newDiceRoll({d1: false, d2: false, diceEnabled: true, stealEnabled: false}))
        let setupDealt = setupDeal(this.props.structure, this.props.corners, this.props.hexData)
        setupDealt.forEach(incr => {
          addAction(incrementResource(incr.player, incr.resource, incr.num))
        })

        //console.log(`Set up phase is complete. Normal game play begins.`)
        let message = { name: "Space Station",
        text: `Set up phase is complete. Now roll dice and trade to collect the right resources in order to purchase structures and roads. **Note when a player rolls the dice, every player will receive one resource for each hexagon adjacent to their buildings, where the hex's number matches the sum of the rolled dice. If you have a city, you will receive two resources instead of one. You can only purchase structures connected to your other buildings.`}
        this.props.addMessage(message);

      }
      else { //within either round
        if (turnArray){
          let nextPlayerID = turnArray[0]
          addAction(shiftTurns())
          addAction(setNextTurn(nextPlayerID))
        } 
       }
    }
  }

  render() {
    return (
    	<div className='playerInfo mdl-grid'>
        <div className="mdl-cell mdl-cell--6-col">


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

        {this.props.inProgress && !this.props.isSettingUp && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && this.props.diceRoll.diceEnabled ?

          <RaisedButton label="Roll Dice" onClick={() => addAction(newDiceRoll(this.rollDice()))} />
            :
          <div></div>
        }

       {this.props.inProgress && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && !this.props.diceRoll.diceEnabled ?
          <RaisedButton label="End Turn" onClick={() => this.nextPlayer()} />
          :
          <div></div>
        }
      </div>
      <div className="mdl-cell mdl-cell--6-col">
        {this.props.inProgress && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name ?
          <Structures />
          :
          <div></div>
        }
      </div>

      { this.props.players.length > 0 && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && this.props.diceRoll.stealEnabled ?

        <div style={{border: '1px solid gray', marginRight: '10%', borderRadius: '5px'}}>
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
          <RaisedButton label="Steal!" onClick={() => addAction(this.submitStealInfo(this.state.stealFrom))} />
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

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {addAction} from '../reducers/action-creators';
import { newDiceRoll } from '../reducers/dice';
import {incrementResource, decrementResource} from '../reducers/players';
import {addMessage} from '../reducers/chatroom';
import {initials} from '../reducers/helperFunctions';
import {deal} from 'APP/gameutils/deal'

export class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diceEnabled: true, //this should be true by default
      stealEnabled: false,
      stealFrom: "Player"
    }
    this.rollDice = this.rollDice.bind(this);
    this.submitStealInfo = this.submitStealInfo.bind(this);
  }

  rollDice(bool) {
  	let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    let total = d1+d2;
    if (d1 !== d2) {
      this.setState({diceEnabled: false});
    }
    else if (total === 7){ //if you roll a 7
      this.setState({diceEnabled: false, stealEnabled: true}); //allow stealing
    }
    deal(this.props.structure, this.props.corners, this.props.hexData, total)
    return {d1: d1, d2: d2}; //return the object that will be stored on the state since all the calcs are done in this function
  }

  submitStealInfo(playerToRob) {
    let resources = ["crops", "ice", "solar", "hematite", "fuel"];
    let randomResource;
    let theftCall = 0; //only allow for one steal
    let setToStealFrom = this.props.players[playerToRob].cardsResource //player's available resources

    while (theftCall === 0){ //while nothing has been stolen yet
      randomResource = resources[Math.floor(Math.random() * 5)]; //set randomResource to a random index 0-4
      if (setToStealFrom[randomResource] > 0){ //if the person has that card available
        theftCall++; //increment theft call to break out of loop
        this.setState({stealEnabled:false}); //set stealEnabled back to false
        addAction(incrementResource(this.props.loggedInUser.displayName, randomResource, 1)); //increase robber's resource
        addAction(decrementResource(this.props.players[playerToRob].name, randomResource, 1)); //remove one card from playerToRob
        let message = {
          name: "Space Station",
          text: `${initials(this.props.loggedInUser.displayName)} stole from ${initials(this.props.players[playerToRob].name)}`
        }
        this.props.addMessage(message);
      }
    }
    theftCall = 0; //set theftCall back to default 0 value
  }

  render() {
    return (
    	<div className='playerInfo'>

      { this.props.diceRoll.d1 && this.props.diceRoll.d2 ?
        <div>
           <div>Last roll:{this.props.diceRoll.d1 + this.props.diceRoll.d2}</div>
           <img src={`/die/d${this.props.diceRoll.d1}.gif`}/>
           <img src={`/die/d${this.props.diceRoll.d2}.gif`}/>
           <br />
           <br />
         </div>
       :
       <div></div>
      }

      { this.props.players.length > 0 && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && this.state.diceEnabled ?

        <button onClick={() => addAction(newDiceRoll(this.rollDice()))}>Roll Dice</button>
          :
          <div></div>
      }

      { this.props.players.length > 0 && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && this.state.stealEnabled ?

        <div style={{border: '1px solid gray', marginRight: '10%'}}>
          <h6 style={{textAlign: 'center'}}>STEAL FROM PLAYER</h6>
            <DropDownMenu value={this.state.stealFrom} onChange={(e,i,v) => this.setState({stealFrom: v})}>
              <MenuItem disabled={true} value='Player' primaryText="Player" />
              { this.props.players.map((player,idx) => <MenuItem value={idx} primaryText={player.name.split(" ")[0]} key={idx} />) }
            </DropDownMenu>
          <button onClick={() => addAction(this.submitStealInfo(this.state.stealFrom))}>Steal!</button>
         </div>
          :
        <button disabled>👾 Waiting to Steal! 👾</button>
      }

		</div>

    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';

const mapStore = ({ diceRoll, loggedInUser, turnInfo, players, inProgress, corners, structure, hexData }) => ({diceRoll, loggedInUser, turnInfo, players, inProgress, corners, structure, hexData })
const mapDispatch = {addMessage};
export default connect(mapStore, mapDispatch)(Dice);

export { Dice as PureDice }; //this is for testing, do not remove unless updating test suite

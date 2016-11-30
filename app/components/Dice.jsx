import React, {Component} from 'react';
import {addAction} from '../reducers/action-creators'
import { newDiceRoll } from '../reducers/dice';
import RaisedButton from 'material-ui/RaisedButton';

export class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	d1: null,
    	d2: null,
      diceEnabled: true //this should be true by default
    }
    this.rollDice = this.rollDice.bind(this)
  }

  rollDice(bool) {
  	let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    if (d1 === d2) { //if the roll is a double, keep the dice enabled to allow for additional rolls
      this.setState({d1: d1, d2: d2, diceEnabled: true});
    }
    else this.setState({d1: d1, d2: d2, diceEnabled: false});
    return {sum: d1+d2}; //return the object that will be stored on the state since all the calcs are done in this function
  }

  render() {
    return (
    	<div className='playerInfo'>
      { this.state.d1 && this.state.d2 ?
        <div>
           <img src={`/die/d${this.state.d1}.gif`}/>
           <img src={`/die/d${this.state.d2}.gif`}/>
           <br />
           <br />
         </div>
       :
       <div></div>
      }

      { this.props.players.length > 0 && this.props.loggedInUser.displayName === this.props.players[this.props.turnInfo-1].name && this.state.diceEnabled ?

        <RaisedButton label="Roll Dice" onClick={() => addAction(newDiceRoll(this.rollDice()))} />
          :
          <button disabled>Can't Roll Dice</button>
      }
      <div>Last roll:{this.props.diceRoll.sum}</div>
		</div>

    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';

const mapStore = ({ diceRoll, loggedInUser, turnInfo, players }) => ({diceRoll, loggedInUser, turnInfo, players})

export default connect(mapStore, null)(Dice);

import React, {Component} from 'react';
import {addAction} from '../reducers/action-creators'
import { newDiceRoll } from '../reducers/dice'; 


export class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	d1: 1,
    	d2: 1
    }
    this.rollDice = this.rollDice.bind(this)
  }

  rollDice() {
  	let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    this.setState({d1: d1, d2: d2}); //TODO: disable rollDice after roll unless double (remove isDouble)
    return {sum: d1+d2, isDouble: d1===d2}; //return the object that will be stored on the state since all the calcs are done in this function
  }

  render() {
    return (
    	<div>
		  <img src={`/die/d${this.state.d1}.gif`}/>
		  <img src={`/die/d${this.state.d2}.gif`}/>
		  <button onClick={() => addAction(newDiceRoll(this.rollDice()))}>Roll Dice</button>
      <div>Last roll:{this.props.diceRoll.sum}</div>
		</div>

    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';

const mapStore = ({ diceRoll }) => ({diceRoll})

export default connect(mapStore, null)(Dice);

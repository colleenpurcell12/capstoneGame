import React, {Component} from 'react';


export class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	d1: 1,
    	d2: 1
    }
  }

  rollDice() {
  	let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    this.setState({d1: d1, d2: d2});
    return {sum: d1+d2, isDouble: d1===d2}; //return the object that will be stored on the state since all the calcs are done in this function
  }

  render() {
    return (
    	<div>
		  <img src={`/die/d${this.state.d1}.gif`}/>
		  <img src={`/die/d${this.state.d2}.gif`}/>
		  <button onClick={() => this.props.setDiceRoll(this.rollDice())}>Roll Dice</button>
		</div>

    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { setDiceRoll } from '../reducers/dice'; //bring in our setDiceRoll dispatcher, which will literally just dispatch newDiceRoll
//bring in other results from reducers as necessary

const mapDispatch = { setDiceRoll };

export default connect(null, mapDispatch)(Dice);

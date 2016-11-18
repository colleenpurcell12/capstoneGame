import React, {Component} from 'react';


export default class Dice extends Component {
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
    this.setState({d1: d1, d2: d2})
  }

  render() {
    return (
    	<div>
		  <img src={`/die/d${this.state.d1}.gif`}/>
		  <img src={`/die/d${this.state.d2}.gif`}/>
		  <button onClick={()=>this.rollDice()}>Roll Dice</button>
		</div>
		      
    );
  }
}
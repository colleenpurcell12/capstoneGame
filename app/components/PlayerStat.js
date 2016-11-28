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
    this.state = {
    };
  }
  componentDidMount() {


  }
  changeCount(resource, isGoingUp){
    const playersRef  = firebase.database().ref().child('players')
    const cardsRef       = playersRef.child('player1').child('cards')

    if(isGoingUp) { this.state[resource]++ }
    else { this.state[resource]-- } //[resource] works

    cardsRef.update({ [resource]: this.state[resource]}) //[resource] work
    cardsRef.child(resource).on('value',   snap => { this.setState ({ [resource]:  snap.val() })
      //[resource] WORKS
  })
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
    return (
			<div>
				<div>
          {userArray.cards[type1]}
        </div>
        <div>
        {userArray.cards[type2]}
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

		)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { endTurn } from '../reducers/playerStat'; 
import { setNextRound, endSetUp, nextTurn } from '../reducers/turnBooleans';

const mapState = ({ turnInfo }) => ({turnInfo});
const mapDispatch = { endTurn, setNextRound, endSetUp, nextTurn };

export default connect(
  mapState,
  mapDispatch
)(PlayerStat)

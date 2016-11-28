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
      wool: 0,
      brick: 5,
      grain: 5,
      ore: 2,
      lumber: 0
    };
  }
  componentDidMount() {
    const rootRef 		= firebase.database().ref()
    const playersRef 	= rootRef.child('players')

    // TO DO: GET PLAYER # from the store
    const playerIndivRef = playersRef.child('player1')
		const cardsRef 			 = playerIndivRef.child('cards')

		const woolRef 	= cardsRef.child('wool')
		const brickRef  = cardsRef.child('brick')
		const grainRef  = cardsRef.child('grain')
		const oreRef 		= cardsRef.child('ore')
		const lumberRef = cardsRef.child('lumber')
    //console.log('Chatroom.componentDidMount messagesRef=', messagesRef)

    woolRef.on('value', 	snap => { this.setState ({ wool:  snap.val()	}) })
    brickRef.on('value', 	snap => { this.setState ({ brick: snap.val() }) })
    grainRef.on('value', 	snap => { this.setState ({ grain: snap.val() }) })
    oreRef.on( 'value', 	snap => { this.setState ({ ore: 		snap.val() }) })
    lumberRef.on('value', snap => { this.setState ({ lumber: snap.val() }) })
      //console.log("XXX**** snap.val() ",snap.val() )
      //console.log("XXX**** state",this.state)
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
  handleChange (e) {
    //console.log(e.target.value) //name of input
    //need to grab the "current user" and give them the award in the database
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
        // console.log("GOING TO 2nd ROUND")

        //reset all the userArray hasBoughtARoad and hasBoughtASettlement to false
        for (var i = 0; i<4 ; i++){
            userArray[i].hasBoughtARoad = false;
            userArray[i].hasBoughtASettlement = false
        }

        this.props.setNextRound() //dispatch(nextRound()); //which sets whoseTurn to 4, turnArray to [3,2,1]) and isFirstRound = false
        this.props.endTurn(3) //to 4
        }
      
      //check if end of 2nd round, therefore end of set up phase
      else if (isFirstRound === false && turnArray.length === 1) { 
        // console.log("END OF 2ND ROUND")
        // initialize normal cycle of turns
        this.props.endTurn(0)
        this.props.endSetUp()   //dispatch(startNormGamePlay()); which sets whoseTurn to 1 and isSettingUp ==false
      }
      //within either round
      else {
        if (turnArray){
          let player1 = turnArray[0]
          if (isFirstRound === false){
            player1-- //endTurn increments the # 
          }
          this.props.nextTurn() 
          this.props.endTurn(player1) //dispatch(setNextTurn(player));
        } 
        else { console.log("turnArray is undefined") }
      }
    }
  //console.log("The turnArray is",turnArray,"and isSettingUp? is",isSettingUp,"and isFirstRound? is",isFirstRound)
  }

  render() {
    //console.log("Player Stat knows the curr players is ", this.props.turnInfo)
    return (
			<div>
				<div>
          <input type="button" onClick={() => this.changeCount('wool',false) } value="-"/>
          Wool 	 	{this.state.wool}
          <input type="button" onClick={ () => this.changeCount('wool',true) } value="+"/>
        </div>

        <div>
        <input type="button" onClick={() => this.changeCount('brick',false) } value="-"/>
				 Brick  {this.state.brick}
        <input type="button" onClick={ () => this.changeCount('brick',true) } value="+"/>
				</div>

        <div>
        <input type="button" onClick={() => this.changeCount('grain',false) } value="-"/>
         Grain  {this.state.grain}
				<input type="button" onClick={ () => this.changeCount('grain',true) } value="+"/>
        </div>

        <div>
        <input type="button" onClick={() => this.changeCount('ore',false) } value="-"/>
        Ore 	 {this.state.ore}
				<input type="button" onClick={ () => this.changeCount('ore',true) } value="+"/>
        </div>

        <div>
        <input type="button" onClick={() => this.changeCount('lumber',false) } value="-"/>
        Lumber {this.state.lumber}
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

		)
	}
}




/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { endTurn } from '../reducers/playerStat'; //bring in our setDiceRoll dispatcher, which will literally just dispatch newDiceRoll
import { setNextRound, endSetUp, nextTurn } from '../reducers/turnBooleans';

//bring in other results from reducers as necessary like isSettingUp, isFirstRound...

const mapState = ({ turnInfo }) => ({turnInfo});
const mapDispatch = { endTurn, setNextRound, endSetUp, nextTurn };

export default connect(
  mapState,
  mapDispatch
)(PlayerStat)

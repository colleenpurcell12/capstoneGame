import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';

import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

//import Awards from '/Awards'

//needs to know which player's card is showing
 // const messages = this.state && this.state.messages || []
 //    {Object.keys(messages).map(k => messages[k]).map( (message, idx) => )}

  // <a onClick={ () => this.incrementValue(Wool) } className="glyphicon glyphicon-plus">+++
        // </a>

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
    //console.log("XXX**** HELLO")
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
    console.log(e.target.value) //name of input
    //need to grab the "current user" and give them the award in the database
  }

  render() {
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
				<div> Building materials-- 	</div>
     		<div> Road        = Brick and Lumber						</div>
     		<div> Settlement  = Lumber, Brick, Grain and Wool	</div>
     		<div> City        = Two Wool and Three Ore							</div>
     		<div> Developer   = One Wool, One Grain, and One Ore 		</div>

				<button type='submit' onClick={() => this.props.endTurn(this.props.whoseTurn)}> Done with Turn </button>
			</div>

		)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { endTurn } from '../reducers/playerStat'; //bring in our setDiceRoll dispatcher, which will literally just dispatch newDiceRoll
//bring in other results from reducers as necessary

const mapDispatch = { endTurn };
const mapState = ({ whoseTurn }) => whoseTurn
export default reduxForm({
  form: 'PlayerStat',  // a unique identifier for this form
  validate,
  mapState,
  mapDispatch
})(PlayerStat)

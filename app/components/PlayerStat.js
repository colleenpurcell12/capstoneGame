import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';

//needs to know which player's card is showing
 // const messages = this.state && this.state.messages || []
 //    {Object.keys(messages).map(k => messages[k]).map( (message, idx) => )}

  // <a onClick={ () => this.incrementValue(Wool) } className="glyphicon glyphicon-plus">+++
        // </a>
export default class PlayerStat extends Component {
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
    const rootRef 		= this.props.database.ref()
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
  changeValue(resource, isGoingUp){
    const playersRef  = this.props.database.ref().child('players')
    const cardsRef       = playersRef.child('player1').child('cards')
    if(isGoingUp) { this.state[resource]++ }
    else { this.state[resource]-- } //[resource] works
    cardsRef.update({ [resource]: this.state[resource]}) //[resource] work
    cardsRef.child(resource).on('value',   snap => { this.setState ({ [resource]:  snap.val() }) 
      //[resource] WORKS
  })
  }

  render() {
    return (
			<div>
				<div>
          <input type="button" onClick={() => this.changeValue('wool',false) } value="-"/>
          Wool 	 	{this.state.wool}
          <input type="button" onClick={ () => this.changeValue('wool',true) } value="+"/>
        </div> 

        <div>
        <input type="button" onClick={() => this.changeValue('brick',false) } value="-"/>
				 Brick  {this.state.brick}
        <input type="button" onClick={ () => this.changeValue('brick',true) } value="+"/>
				</div>

        <div>
        <input type="button" onClick={() => this.changeValue('grain',false) } value="-"/>
         Grain  {this.state.grain}
				<input type="button" onClick={ () => this.changeValue('grain',true) } value="+"/>
        </div>

        <div> 
        <input type="button" onClick={() => this.changeValue('ore',false) } value="-"/>
        Ore 	 {this.state.ore}
				<input type="button" onClick={ () => this.changeValue('ore',true) } value="+"/>
        </div>

        <div> 
        <input type="button" onClick={() => this.changeValue('lumber',false) } value="-"/>
        Lumber {this.state.lumber}
				<input type="button" onClick={ () => this.changeValue('lumber',true) } value="+"/>
        </div>

        <br></br>
				<div> Building materials-- 	</div>
     		<div> Road        = Brick and Lumber						</div>
     		<div> Settlement  = Lumber, Brick, Grain and Wool	</div>
     		<div> City        = Two Wool and Three Ore							</div>
     		<div> Developer   = One Wool, One Grain, and One Ore 		</div>

				<button type='submit'> Done with Turn </button>
			</div>
		)
	}
}
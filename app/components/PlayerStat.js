import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';

//needs to know which player's card is showing
 // const messages = this.state && this.state.messages || []
 //    {Object.keys(messages).map(k => messages[k]).map( (message, idx) => )}
export default class PlayerStat extends Component {
	constructor(props) {
    super(props);
    this.state = {
      woolCount: 0,
      brickCount: 5,
      grainCount: 5,
      oreCount: 2,
      lumberCount: 0
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

    woolRef.on('value', 	snap => { this.setState ({ woolCount:  snap.val()	}) })
    brickRef.on('value', 	snap => { this.setState ({ brickCount: snap.val() }) })
    grainRef.on('value', 	snap => { this.setState ({ grainCount: snap.val() }) })
    oreRef.on( 'value', 	snap => { this.setState ({ oreCount: 		snap.val() }) })
    lumberRef.on('value', snap => { this.setState ({ lumberCount: snap.val() }) })
      //console.log("XXX**** snap.val() ",snap.val() )
      //console.log("XXX**** state",this.state) 
  }
  render() {
    return (
			<div>
				<div> Wool 	 {this.state.woolCount}</div>
				<div> Brick  {this.state.brickCount}</div>
				<div> Grain  {this.state.grainCount}</div>
				<div> Ore 	 {this.state.oreCount}</div>
				<div> Lumber {this.state.lumberCount}</div>
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
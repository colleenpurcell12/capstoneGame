import React, { Component } from 'react';
import {addAction} from '../reducers/action-creators'
import { listenToPlayers, addPlayer } from '../reducers/dice'; 

export class Players extends Component {
	constructor() {
		super()
	}
	componentDidMount() {
		addAction(listenToPlayers())
		addAction(addPlayer(this.props.loggedInUser));
	}
	render() {
		return(
			<div>
				<table>
				<tbody>
					<tr>
						<th>Players</th>
						<th>Card Count</th>
					</tr>
						{Object.keys(this.props.players).map((player, idx) => (
							<tr key={idx}>
								<td>{idx+1}: {this.props.players[player].name}</td>
								<td>{this.props.players[player].cards}</td>
							</tr>
						))}
						{this.props.players && this.props.players["player1"] ?
							<tr><th>Current Player: {this.props.players[`player${this.props.turnInfo}`].name}</th></tr>
							:
							<tr><th>Current Player: </th></tr>
						}
				</tbody>
				</table>
			</div>
		)
	}
}


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { listenToPlayers, addPlayer } from '../reducers/players';

const mapState = ({ players, loggedInUser, turnInfo }) => ({ players, loggedInUser, turnInfo}) //added turnInfo for display purposes

// const mapDispatch = { listenToPlayers, addPlayer }

export default connect(mapState, null)(Players);


// export const listenToPlayers = () => dispatch => {
//   const rootRef = firebase.database().ref();
//   const gameRef = rootRef.child('game');
//   const playersRef = gameRef.child('players')
//   playersRef.on('value', snap => {
//     dispatch(load(snap.val())) //t
//   });
// }

// export const addPlayer = (player) => dispatch => {
//   const rootRef = firebase.database().ref();
//   const gameRef = rootRef.child('game');
//   const playersRef = gameRef.child('players')
//   playersRef.on('value', snap => {
//     for(var key in snap.val()) { //key is either player1, player2,... player 4
//       if(snap.val()[key].name === player.displayName) break;
//       if(snap.val()[key].name === "empty") {
//         playersRef.child(key).update({name: player.displayName})
//         break;
//       }
//     }
//     //need to add up to 4 players to game
//     //need to start game when 4 players are added
//     if (snap.val()['player4'].name !== "") dispatch(startTheGame(true)); //can this statement checked somewhere else? -SC
//   })
// }
//need to create game instance
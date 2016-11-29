import React, { Component } from 'react';
import { addAction } from '../reducers/action-creators'
import { addPlayer } from '../reducers/players';
import { startGame } from '../reducers/home';


export class Players extends Component {
	constructor() {
		super()
	}
	// componentWillMount() {
	// 	this.props.players.length >= 4 && this.props.inProgress === false ?
	// 	addAction(startGame(true)) : null;
	// }
	render() {
		return(
			<div style={{background:'white', opacity:'.95', borderRadius: '5px'}}>
				<table>
				<tbody>
					<tr>
						<th>Players</th>
						<th>Card Count</th>
					</tr>
						{this.props.players.map((player, idx) => (
							<tr key={idx}>
								<td>{idx+1}: {player.name}</td>
								<td>{player.cardsTotal()}</td>
							</tr>
						))}
						{this.props.inProgress ?
							<tr><th>Current Player: {this.props.players[this.props.turnInfo-1].name}</th></tr>
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

const mapState = ({ players, loggedInUser, turnInfo, inProgress, doneLoading }) => ({ players, loggedInUser, turnInfo, inProgress, doneLoading }) //added turnInfo for display purposes

export default connect(mapState, null)(Players);

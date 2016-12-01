import React, { Component } from 'react';
import { addAction } from '../reducers/action-creators'
import { addPlayer } from '../reducers/players';

export class Players extends Component {
	constructor() {
		super()
	}

	render() {
		return(
			<div className='playerInfo'>
				<table>
				<thead>
					<tr>
						<th>Players</th>
						<th>Card Count</th>
					</tr>
				</thead>
				<tbody>
					{this.props.players.map((player, idx) => (
						<tr key={idx}>
							<td><span className={`player${idx}`}>&#9632;</span>{idx+1}: {player.name}</td>
							<td>{player.cardsTotal()}</td>
						</tr>
					))}
				</tbody>
				</table>
				{this.props.inProgress ?
					<div><strong>Current Player: {this.props.players[this.props.turnInfo-1].name}</strong></div>
					:
					<div><strong>Waiting for {4 - this.props.players.length} more player(s)</strong></div>
				}
			</div>
		)
	}
}


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';

const mapState = ({ players, loggedInUser, turnInfo, inProgress, doneLoading }) => ({ players, loggedInUser, turnInfo, inProgress, doneLoading }) //added turnInfo for display purposes

export default connect(mapState, null)(Players);

export { Players as PurePlayers }; //this is for testing, do not remove unless updating test suite

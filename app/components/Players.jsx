import React, { Component } from 'react';

export class Players extends Component {
	constructor() {
		super()
	}
	componentDidMount() {
		this.props.listenToPlayers();
		this.props.addPlayer(this.props.loggedInUser);
	}
	render() {
		return(
			<div>
				<table>
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
						<tr>{`${this.props.players[`player1`].name}'s Turn`}
						</tr>
				</table>
			</div>
		)
	}
}


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { listenToPlayers, addPlayer } from '../reducers/players';

const mapState = ({ players, loggedInUser }) => ({ players, loggedInUser}) //added whoseTurn for display purposes

const mapDispatch = { listenToPlayers, addPlayer }

export default connect(mapState, mapDispatch)(Players);

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
				<div>Players:</div>
				{Object.keys(this.props.players).map((player, idx) => (
					<div key={idx}>{player}: {this.props.players[player]}</div>
				))}
			</div>
		)
	}
}


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { listenToPlayers, addPlayer } from '../reducers/players'

const mapState = ({ players, loggedInUser }) => ({ players, loggedInUser })

const mapDispatch = { listenToPlayers, addPlayer }

export default connect(mapState, mapDispatch)(Players);

import React, { Component } from 'react';
import { addAction } from '../reducers/action-creators';
import { addPoint, subtractPoint } from '../reducers/players';
import { assignVictoryCards } from '../reducers/victory-cards';
import { firstNameLastInitial } from '../reducers/helperFunctions';


export class Players extends Component {
	constructor() {
		super()
		this.handleRoadChange = this.handleRoadChange.bind(this)
		this.handleArmyChange = this.handleArmyChange.bind(this)
	}

	handleRoadChange(event) {
		if(this.props.victoryCards.road) { //if previous player had longest army, need to remove 2 VPs
			addAction(subtractPoint(this.props.victoryCards.road, 2))
		}
			addAction(addPoint(event.target.value)) //need to add 2 VPs
			addAction(addPoint(event.target.value))
		//reassign longest road to player
		addAction(assignVictoryCards({road: event.target.value, army: this.props.victoryCards.army}))
	}

	handleArmyChange(event) {
		if(this.props.victoryCards.army) { //if previous player had largest army, need to remove 2 VPs
			addAction(subtractPoint(this.props.victoryCards.army, 2))
		} 
			addAction(addPoint(event.target.value)) //need to add 2 VPs
			addAction(addPoint(event.target.value))
		//reassign largest army to player
		addAction(assignVictoryCards({road: this.props.victoryCards.road, army: event.target.value}))
	}

	render() {
		return(
			<div className='playerInfo'>
				<table>
				<thead>
					<tr>
						<th>Players</th>
						<th><span title="Total Cards">Cards</span></th>
						<th><span title="Longest Road">Road</span></th>
						<th><span title="Largest Army">Army</span></th>
					</tr>
				</thead>
				<tbody>
					{this.props.players.map((player, idx) => (
						<tr key={idx}>
							<td><span className={`player${idx}`}>&#9632;</span>{idx+1}: 
							{ `${firstNameLastInitial(player.name)}`}</td>
							<td style={{textAlign:"center"}}>{player.cardsTotal()}</td>
							<td><input type="radio" name="road" value={player.name} checked={player.name === this.props.victoryCards.road} onChange={this.handleRoadChange}/></td>
							<td><input type="radio" name="army" value={player.name} checked={player.name === this.props.victoryCards.army} onChange={this.handleArmyChange}/></td>
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

const mapState = ({ players, turnInfo, loggedInUser, inProgress, doneLoading, victoryCards }) => ({ players, loggedInUser, turnInfo, inProgress, doneLoading, victoryCards }) //added turnInfo for display purposes, deleted loggedInUser

export default connect(mapState, null)(Players);

export { Players as PurePlayers }; //this is for testing, do not remove unless updating test suite

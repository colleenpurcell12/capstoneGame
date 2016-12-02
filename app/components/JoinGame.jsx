import React from 'react';
import { Link } from 'react-router';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import { listenGames, newGame } from '../reducers/game'

export class JoinGame extends React.Component {
	constructor() {
		super()
		this.state = {
			showCheckboxes: false,
		}
		this.addNewGame = this.addNewGame.bind(this)
	}
	componentDidMount() {
		this.props.listenGames()
	}

	addNewGame() {
		this.props.newGame()
	}

	render() {
		const games = this.props.games;
		return(
			<div>
				<Table>
				    <TableHeader
	                	displaySelectAll={this.state.showCheckboxes}
	            		adjustForCheckbox={this.state.showCheckboxes}
				    >
				      <TableRow>
				        <TableHeaderColumn>ID</TableHeaderColumn>
				        <TableHeaderColumn>Name</TableHeaderColumn>
				        <TableHeaderColumn>Status</TableHeaderColumn>
				      </TableRow>
				    </TableHeader>
				    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
				      	{games && Object.keys(games).map((key, idx) => (
			      		<TableRow key={key}>
					        <TableRowColumn>{key}</TableRowColumn>
					        <TableRowColumn>Game {idx}</TableRowColumn>
					        <TableRowColumn><Link to={`/game/${key}`}><button>Join</button></Link></TableRowColumn>
				      	</TableRow>
		      			))}
				    </TableBody>
			  	</Table>
			  	<button onClick={() => this.props.newGame()}>New Game</button>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'
 
const mapStateToProps = ({ games, gameID }) => ({ games, gameID })

const mapDispatch = { listenGames, newGame }

export default connect(mapStateToProps, mapDispatch)(JoinGame);
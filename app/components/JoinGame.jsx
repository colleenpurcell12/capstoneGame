import React from 'react';
import { Link } from 'react-router';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import { listenGames, join, newGame } from '../reducers/game'

export class JoinGame extends React.Component {
	constructor() {
		super()
		this.state = {
			showCheckboxes: false,
		}
		this.addNewGame = this.addNewGame.bind(this)
		this.joinGame = this.joinGame.bind(this)
	}
	componentDidMount() {
		this.props.listenGames()
	}

	joinGame(key) {
		this.props.join(key)
	}

	addNewGame(gameID) {
		this.props.newGame(gameID)
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
				      	{games && Object.keys(games).map(key => (
			      		<TableRow key={key}>
					        <TableRowColumn>{key}</TableRowColumn>
					        <TableRowColumn>Game{key}</TableRowColumn>
					        <TableRowColumn><Link to={`/game/${key}`}><button onClick={()=>this.joinGame(key)}>Join</button></Link></TableRowColumn>
				      	</TableRow>
		      			))}
				    </TableBody>
			  	</Table>

			  	<Link><button onClick={() => this.props.newGame()}>New Game</button></Link>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'
 
const mapStateToProps = ({ games }) => ({ games })

const mapDispatch = { listenGames, newGame, join }

export default connect(mapStateToProps, mapDispatch)(JoinGame);
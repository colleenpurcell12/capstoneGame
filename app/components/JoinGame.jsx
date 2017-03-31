import React from 'react';
import { Link } from 'react-router';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { listenGames, newGame } from '../reducers/game'

export class JoinGame extends React.Component {
	constructor() {
		super()
		this.state = {
			showCheckboxes: false,
			name: "",
			errorText: "",
		}
		this.handleChange = this.handleChange.bind(this)
		this.addNewGame = this.addNewGame.bind(this)
	}
	componentDidMount() {
		this.props.listenGames()
	}

	handleChange(event) {
		this.setState({name: event.target.value, errorText: ""})
	}

	addNewGame(name) {
		if(!this.state.name.trim()) 
			this.setState({errorText: "Name is required"})
		else this.props.newGame(name)
	}

	render() {
		const games = this.props.games;
		return(
    	<div className="mdl-grid">
	    	<div className="mdl-cell mdl-cell--3-col"></div>
		    <div className="mdl-cell mdl-cell--6-col">
					<Table>
				    <TableHeader
            	displaySelectAll={this.state.showCheckboxes}
          		adjustForCheckbox={this.state.showCheckboxes}
				    >
				      <TableRow>
				        <TableHeaderColumn>Name</TableHeaderColumn>
				        <TableHeaderColumn>Status</TableHeaderColumn>
				      </TableRow>
				    </TableHeader>
				    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
			      	{games && Object.keys(games).map((key, idx) => (
		      		<TableRow key={key}>
				        <TableRowColumn className="game-name">{games[key].name}</TableRowColumn>
				        <TableRowColumn><Link to={`/game/${key}`}><RaisedButton label="Join" /></Link></TableRowColumn>
			      	</TableRow>
	      			))}
  	       	</TableBody>
			  	</Table>
			  	<br/>
		  		<div className="mdl-grid game-new">
			  		<div className="mdl-cell mdl-cell--6-col">
  						<TextField 
  							hintText="Enter new game name" 
  							floatingLabelText="Enter new game name" 
  							errorText={this.state.errorText}  
  							onChange={this.handleChange} />
						</div>
			  		<div className="mdl-cell mdl-cell--6-col game-button">
							<RaisedButton onClick={() => this.addNewGame(this.state.name)} label="New Game" />
						</div>
					</div>
				</div>
	    	<div className="mdl-cell mdl-cell--3-col"></div>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'
 
const mapStateToProps = ({ games, gameID }) => ({ games, gameID })

const mapDispatch = { listenGames, newGame }

export default connect(mapStateToProps, mapDispatch)(JoinGame);
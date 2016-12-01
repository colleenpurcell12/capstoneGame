import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export class JoinGame extends React.Component {
	constructor() {
		super()
		this.state = {
			showCheckboxes: false,
		}
	}

	render() {
		return(
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
			      <TableRow>
			        <TableRowColumn>1</TableRowColumn>
			        <TableRowColumn>Game1</TableRowColumn>
			        <TableRowColumn><button>Join</button></TableRowColumn>
			      </TableRow>
			      <TableRow>
			        <TableRowColumn>2</TableRowColumn>
			        <TableRowColumn>Game2</TableRowColumn>
			        <TableRowColumn>In Progress</TableRowColumn>
			      </TableRow>
			    </TableBody>
			  </Table>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'

const mapStateToProps = ({ }) => ({ })

export default connect(mapStateToProps)(JoinGame);
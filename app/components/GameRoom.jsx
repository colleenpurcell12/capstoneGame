import React from 'react';
import GoogleLogin from './GoogleLogin';
import PlayerStat from './PlayerStat';
import Dice from './Dice';
import Chatroom from './Chatroom';
import Board from './Board';
import Players from './Players';

export class GameRoom extends React.Component {
	render() {
		return (
			<div>
        <GoogleLogin />
      	<div className="mdl-grid game-room">
			    <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
			        <Chatroom />
			    </div>
			    {this.props.doneLoading?
		     	<div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone">
			        <Board />
			    </div>
			    :
			    <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone">
			        <h3>Setting up the board...</h3>
			    </div>
			    }
			    <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
			    	<div>
			     		<Players /> <br/>
			          	<Dice />
			        	<br/>
			        	<PlayerStat />
			        </div>
			    </div>
      	</div>
    	</div>
    )
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'

const mapStateToProps = ({ doneLoading, isSettingUp }) => ({ doneLoading, isSettingUp })

export default connect(mapStateToProps)(GameRoom);

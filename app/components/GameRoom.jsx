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
			<div class="">
        <GoogleLogin />
      	<div className="mdl-grid game-room">
			    <div className="mdl-cell mdl-cell--3-col">
			        <Chatroom />
			    </div>
			    {this.props.doneLoading?
		     	<div className="mdl-cell mdl-cell--6-col">
			        <Board />
			    </div>
			    :
			    <div className="mdl-cell mdl-cell--6-col">
			        <h3>Setting up the board...</h3>
			    </div>
			    }
			    <div className="mdl-cell mdl-cell--3-col">
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

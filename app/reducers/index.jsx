import { combineReducers } from 'redux';
import loggedInUser from './login';
import messages from './chatroom';
import players from './players';
import diceRoll from './dice';
<<<<<<< Updated upstream
import turnInfo from './playerStat';
import inProgress from './home';
import {isFirstRound, isSettingUp, turnArray} from './turnBooleans';
import userArray from './usersArray';
import everyStructure from './everyStructure';
import doneLoading from './action-creators';
import structure from './structure';
import selections  from './selection';
import roads  from './road';
import hexData from './hex-data'


const rootReducer = combineReducers({
  loggedInUser,
  messages,
  players,
  diceRoll,
  turnInfo,
  inProgress,
	isFirstRound,
  isSettingUp,
  turnArray,
  userArray,
  everyStructure,
  structure,
  selections,
  roads,
  doneLoading,
	hexData
});
=======
import whoseTurn from './playerStat';
import inProgress from './home';

const rootReducer = combineReducers({ loggedInUser, messages, players, diceRoll, whoseTurn, inProgress });
>>>>>>> Stashed changes

export default rootReducer;

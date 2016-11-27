import { combineReducers } from 'redux';
import loggedInUser from './login';
import messages from './chatroom';
import players from './players';
import diceRoll from './dice';
import turnInfo from './playerStat';
import inProgress from './home';
import actions from './action-creators';
import {isFirstRound, isSettingUp, turnArray} from './turnBooleans';
import userArray from './usersArray';

const rootReducer = combineReducers({ loggedInUser, messages, players, diceRoll, turnInfo, inProgress, actions,
	isFirstRound, isSettingUp, turnArray,  userArray });

export default rootReducer;

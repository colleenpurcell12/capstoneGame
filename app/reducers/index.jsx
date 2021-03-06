import { combineReducers } from 'redux';
import loggedInUser from './login';
import messages from './chatroom';
import players from './players';
import diceRoll from './dice';
import turnInfo from './playerStat';
import inProgress from './home';
import {isFirstRound, isSettingUp, turnArray} from './turnBooleans';
import userArray from './usersArray';
import everyStructure from './everyStructure';
import structure from './structure';
import selections  from './selection';
import roads  from './road';
import robberHex from './robber'
import doneLoading from './action-creators';
import hexData from './hex-data'
import corners  from './corner';
import victoryCards from './victory-cards'
import gameID, {games} from './game';
import winner from './winner';

//import colors  from './colors';

const appReducer = combineReducers({ loggedInUser, messages, players, diceRoll, turnInfo, inProgress,
  isFirstRound, isSettingUp, turnArray,  userArray, everyStructure, structure, selections, roads, robberHex,
  doneLoading, hexData, corners, gameID, games, victoryCards, winner }); //colors

const rootReducer = (state, action) => {
  if (action.type === 'RESET_GAME') {
    state = undefined
  }

  return appReducer(state, action)
}



export default rootReducer;



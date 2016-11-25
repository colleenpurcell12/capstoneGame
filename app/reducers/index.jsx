import { combineReducers } from 'redux';
import loggedInUser from './login';
import messages from './chatroom';
import players from './players';
import diceRoll from './dice';
import whoseTurn from './playerStat';

const rootReducer = combineReducers({ loggedInUser, messages, players, diceRoll, whoseTurn });

export default rootReducer;

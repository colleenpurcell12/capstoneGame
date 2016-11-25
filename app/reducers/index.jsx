import { combineReducers } from 'redux';
import loggedInUser from './login';
import messages from './chatroom';
import players from './players';
import diceRoll from './dice';

const rootReducer = combineReducers({ loggedInUser, messages, players, diceRoll });

export default rootReducer;

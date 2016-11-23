import { combineReducers } from 'redux';
import loggedInUser from './login';
import messages from './chatroom';
import players from './players';

const rootReducer = combineReducers({ loggedInUser, messages, players });

export default rootReducer;

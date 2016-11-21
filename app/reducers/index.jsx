import { combineReducers } from 'redux';
import loggedInUser from './login';
import messages from './chatroom';

const rootReducer = combineReducers({ loggedInUser, messages });

export default rootReducer;

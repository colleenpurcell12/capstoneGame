import * as firebase from 'firebase'
import {loadActions, syncActions, unsyncActions, addAction} from './action-creators';
import {addPlayer} from './players';
import {startGame} from './home';
import Promise from 'bluebird';
import store from '../store';
/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER'

/* ------------   ACTION CREATORS     ------------------ */

const loginUser  = loggedInUser => ({ type: SET_CURRENT_USER, loggedInUser })

/* ------------       REDUCER     ------------------ */

export default function reducer (loggedInUser = null, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.loggedInUser
    default:
      return loggedInUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const listenToAuth = (inProgress, players) => dispatch => {
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
      dispatch(loginUser(firebaseUser))
      dispatch(loadActions());
      // if (players.length >= 4 && inProgress) alert("Game is in Progress")
      // else addAction(addPlayer(firebaseUser.displayName))
      }
		else {
      dispatch(loginUser(null))
      dispatch(unsyncActions())
    }
	})
}

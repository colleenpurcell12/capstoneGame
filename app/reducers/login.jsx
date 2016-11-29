import * as firebase from 'firebase'
import {loadActions, syncActions, unsyncActions, addAction} from './action-creators';
import {addPlayer} from './players';
import {startGame} from './home';
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

export const listenToAuth = () => dispatch => {
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
      dispatch(loginUser(firebaseUser))
      dispatch(loadActions());
      }
		else {
      dispatch(loginUser(null))
      dispatch(unsyncActions())
    }
	})
}

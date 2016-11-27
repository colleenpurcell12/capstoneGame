import * as firebase from 'firebase'
import {syncActions, unsyncActions} from './action-creators'

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
      dispatch(syncActions())
    }
		else {
      dispatch(loginUser(null))
      dispatch(unsyncActions())
    }
	})
}

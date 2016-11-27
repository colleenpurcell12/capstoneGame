//THIS FILE IS GOING TO PERSIST ACTION-CREATORS TO FIREBASE
//WHICH WILL SYNC/UNSYNC THE STORE'S STATE (ACTION-CREATORS => GAME/PLAYER INFO)

import * as firebase from 'firebase'

/* ------------       DISPATCHERS     ------------------ */

//when player joins game turn on listeners and fire actions 
export const syncActions = () => dispatch => {
	firebase.database().ref().child('action-creators').on('child_added', snap => {
    //action-creators = {type: ACTION_TYPE, payload}
    dispatch(snap.val()); 
  })
}

//add new moves to database
export const addAction = action => dispatch => {
  firebase.database().ref().child('action-creators').push(action) //{type: ACTION_TYPE, payload}
}

//when player leaves game turn off listener
export const unsyncActions = () => dispatch => {
  firebase.database().ref().child('action-creators').off()
}

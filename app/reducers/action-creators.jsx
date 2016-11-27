//THIS FILE IS GOING TO PERSIST ACTION-CREATORS TO FIREBASE
//WHICH WILL SYNC/UNSYNC THE STORE'S STATE (ACTION-CREATORS => GAME/PLAYER INFO)

import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const SYNC_ACTIONS = 'SYNC_ACTIONS'
const UNSYNC_ACTIONS = 'UNSYNC_ACTIONS'



/* ------------   ACTION CREATORS     ------------------ */

const sync  = actions => ({ type: SYNC_ACTIONS, actions })
const unsync = () => ({ type: UNSYNC_ACTIONS })



/* ------------       REDUCER     ------------------ */

export default function reducer (actions = [], action) {
  switch (action.type) {

    case SYNC_ACTIONS:
      return action.actions

    case UNSYNC_ACTIONS: 
      return [];

    default:
      return actions;
  }
}


/* ------------       DISPATCHERS     ------------------ */

//when player joins game turn on listeners and fire actions 
export const syncActions = () => dispatch => {
	firebase.database().ref().child('action-creators').on('child_added', snap => {
    //action-creators: { key1 :{}, key2: {} }
    var arrayofActions = [];
    console.log( "snap", snap.val())
    arrayofActions.push(snap.val())
    dispatch(sync(arrayofActions));
    dispatch(arrayofActions); //redux-multi middleware will dispatch array of action-creators in order 
  })
}

//add new moves to database
export const addAction = action => dispatch => {
  firebase.database().ref().child('action-creators').push(action) //{type: ACTION_TYPE, paylod}
}

//when player leaves game turn off listener
export const unsyncActions = () => dispatch => {
  firebase.database().ref().off()
  dispatch(unsync())
}
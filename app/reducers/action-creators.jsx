//THIS FILE IS GOING TO PERSIST ACTION-CREATORS TO FIREBASE
//WHICH WILL SYNC/UNSYNC THE STORE'S STATE (ACTION-CREATORS => GAME/PLAYER INFO)

import * as firebase from 'firebase'

//when player joins game turn on listeners and fire actions

export const loadActions = () => dispatch => {
  return firebase.database().ref().child('action-creators').once('value')
    .then(snap => {
      dispatch(Object.values(snap.val()));
    });
}

export const syncActions = () => dispatch => {
  firebase.database().ref().child('action-creators').limitToLast(1).on('child_added', (snap) => {
    dispatch(snap.val());
  });
}

//add new moves to database
export const addAction = action => {
  firebase.database().ref().child('action-creators').push(action) //{type: ACTION_TYPE, payload}
}

//when player leaves game turn off listener
export const unsyncActions = () => {
  firebase.database().ref().child('action-creators').off()
}

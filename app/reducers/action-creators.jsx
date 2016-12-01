//THIS FILE IS GOING TO PERSIST ACTION-CREATORS TO FIREBASE
//WHICH WILL SYNC/UNSYNC THE STORE'S STATE (ACTION-CREATORS => GAME/PLAYER INFO)

import * as firebase from 'firebase';
import store from '../store';
//import {addPlayer} from './players';
import { assignHexData } from './hex-data'
import { assignHexInfo, tokenArray, resourcesArray } from 'APP/gameutils/setup.js'

//when player joins game turn on listeners and fire actions

export const loadActions = () => dispatch => {
  return firebase.database().ref().child('action-creators').once('value')
    .then(snap => {
      return dispatch(Object.keys(snap.val()).map(key => snap.val()[key]));
    })
    .then(() => {
      dispatch(setLoadingState(true))
      if(store.getState().hexData.length !== 19){
        var hd = assignHexInfo(tokenArray, resourcesArray)
        addAction(assignHexData(hd))
      }
      var first = true;
      dispatch(syncActions(first));
    });
}

export const syncActions = (first) => dispatch => {
  firebase.database().ref().child('action-creators').limitToLast(1).on('child_added', (snap) => {
    first? first = false : dispatch(snap.val());
  });
}
//add new moves to database
export const addAction = action => {
  firebase.database().ref().child('action-creators').push(action)
}

//when player leaves game turn off listener
export const unsyncActions = () => {
  firebase.database().ref().child('action-creators').off()
}

const SET_LOADING_STATE = 'SET_LOADING_STATE'

export default function reducer (doneLoading = false, action) {
  switch (action.type) {
    case SET_LOADING_STATE:
      return action.bool
    default:
      return doneLoading;
  }
}

export const setLoadingState = (bool) => ({
  type: SET_LOADING_STATE,
  bool
})

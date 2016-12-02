//THIS FILE IS GOING TO PERSIST ACTION-CREATORS TO FIREBASE
//WHICH WILL SYNC/UNSYNC THE STORE'S STATE (ACTION-CREATORS => GAME/PLAYER INFO)

import * as firebase from 'firebase';
import store from '../store';
//import {addPlayer} from './players';
import { assignHexData } from './hex-data'
import { assignHexInfo, tokenArray, resourcesArray } from 'APP/gameutils/setup.js'

//when player joins game turn on listeners and fire actions

export const loadActions = (gameID) => dispatch => {
  return firebase.database().ref().child('games').child(gameID).once('value')
    .then(snap => {
      var actions = snap.val().actions
      dispatch(Object.keys(actions).map(key => actions[key]));
      return gameID
    })
    .then((gameID) => {
      var first = true;
      dispatch(syncActions(first, gameID));
      if(store.getState().hexData.length !== 19){
        var hd = assignHexInfo(tokenArray, resourcesArray)
        addAction(assignHexData(hd))
      }
      dispatch(setLoadingState(true))
    })
}

export const syncActions = (first, gameID) => dispatch => {
  firebase.database().ref().child('games').child(gameID).child('actions').limitToLast(1).on('child_added', (snap) => {
    first? first = false : dispatch(snap.val());
  });
}
//add new moves to database
export const addAction = (action) => {
  firebase.database().ref().child('games').child(store.getState().gameID).child('actions').push(action)
}

//when player leaves game turn off listener
export const unsyncActions = (gameID) => {
  firebase.database().ref().child('games').off()
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

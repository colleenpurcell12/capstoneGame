import * as firebase from 'firebase'
import {startTheGame} from './home';

/* -----------------    ACTIONS     ------------------ */

const LOAD_PLAYERS = 'LOAD_PLAYERS'
const ADD_PLAYER = 'ADD_PLAYER'

/* ------------   ACTION CREATORS     ------------------ */

const load  = players => ({ type: LOAD_PLAYERS, players })
const add  = player => ({ type: ADD_PLAYER, player }) //where is this being implemented? -SC

/* ------------       REDUCER     ------------------ */

export default function reducer (players = {}, action) {
  switch (action.type) {
    case LOAD_PLAYERS:
      return action.players
    case ADD_PLAYER:
      //const { players } = state
      return [  ...state.players , action.player] //TODO: if we are using array need to adjust obj.keys to arr.map
      // Object.assign( {}, state, 
      //   { players: [  ...players , action.player] }
      //   )
    default:
      return players;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const listenToPlayers = () => dispatch => {
  const rootRef = firebase.database().ref();
  const gameRef = rootRef.child('game');
  const playersRef = gameRef.child('players')
  playersRef.on('value', snap => {
    dispatch(load(snap.val())) //t
  });
}

export const addPlayer = (player) => dispatch => {
  const rootRef = firebase.database().ref();
  const gameRef = rootRef.child('game');
  const playersRef = gameRef.child('players')
  playersRef.on('value', snap => {
    for(var key in snap.val()) { //key is either player1, player2,... player 4
      if(snap.val()[key].name === player.displayName) break;
      if(snap.val()[key].name === "empty") {
        playersRef.child(key).update({name: player.displayName})
        break;
      }
    }
    //need to add up to 4 players to game
    //need to start game when 4 players are added
    if (snap.val()['player4'].name !== "") dispatch(startTheGame(true)); //can this statement checked somewhere else? -SC
  })
}
//need to create game instance

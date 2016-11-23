import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */


const LOAD_PLAYERS = 'LOAD_PLAYERS'

const ADD_PLAYER = 'ADD_PLAYER'



/* ------------   ACTION CREATORS     ------------------ */

const load  = players => ({ type: LOAD_PLAYERS, players })

const add  = player => ({ type: ADD_PLAYER, player })



/* ------------       REDUCER     ------------------ */

export default function reducer (players = {}, action) {
  switch (action.type) {

    case LOAD_PLAYERS:
      return action.players

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
    dispatch(load(snap.val()))
  }); 
}

export const addPlayer = (player) => dispatch => {
  const rootRef = firebase.database().ref();
  const gameRef = rootRef.child('game');
  const playersRef = gameRef.child('players')
  playersRef.on('value', snap => {
    console.log(snap.val())
    for(var key in snap.val()) {
      if(snap.val()[key].name === "empty") {
        playersRef.child(key).update({name: player.displayName})
        break;
      }
      if(snap.val()[key].name === player.displayName) break;
    } 
  })
}
//need to create game instance
//need to add up to 4 players to game
//need to start game when 4 players are added 
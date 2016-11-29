import * as firebase from 'firebase'
import {startTheGame} from './home';
/* -----------------    ACTIONS     ------------------ */

const ADD_PLAYER = 'ADD_PLAYER'
const INCREMENT_RESOURCE = 'INCREMENT_RESOURCE'
const DECREMENT_RESOURCE = 'DECREMENT_RESOURCE'

/* ------------   ACTION CREATORS     ------------------ */

export const addPlayer  = player => ({ type: ADD_PLAYER, player })
export const incrementResource = (player, resource) => ({ type: INCREMENT_RESOURCE, player, resource})
export const decrementResource = (player, resource) => ({ type: DECREMENT_RESOURCE, player, resource})

/* -----------------    ACTIONS     ------------------ */

const LOAD_PLAYERS = 'LOAD_PLAYERS'

/* ------------   ACTION CREATORS     ------------------ */

const load  = players => ({ type: LOAD_PLAYERS, players })
const add  = player => ({ type: ADD_PLAYER, player })

/* ------------       REDUCER     ------------------ */

export default function reducer (players = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      return players.concat([{name: action.player, cardsTotal: function(){
        return Object.keys(this.cardsResource).map(resource => this.cardsResource[resource]).reduce((a,b) => a+b)    
        }, cardsResource: {lumber: 0, ore: 0, grain:0, wool: 0, brick: 0}, points: 0, startRoad: null, startSettlement: null}]);
    case INCREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource]++
          return player
        }
        else return player
      })
    case DECREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource]--
          return player
        }
        else return player
      })
    default:
      return players;
  }
}

/* ------------       DISPATCHERS     ------------------ */

// export const listenToPlayers = () => dispatch => {
//   const rootRef = firebase.database().ref();
//   const gameRef = rootRef.child('game');
//   const playersRef = gameRef.child('players')
//   playersRef.on('value', snap => {
//     dispatch(load(snap.val()))
//   });
// }

// export const addPlayer = (player) => dispatch => {
//   const rootRef = firebase.database().ref();
//   const gameRef = rootRef.child('game');
//   const playersRef = gameRef.child('players')
//   playersRef.on('value', snap => {
//     for(var key in snap.val()) {
//       if(snap.val()[key].name === "empty") {
//         playersRef.child(key).update({name: player.displayName})
//         break;
//       }
//       if(snap.val()[key].name === player.displayName) break;
//     }
//     if (snap.val()['player4'].name !== "") dispatch(startTheGame(true));
//   })
// }
//need to create game instance
//need to add up to 4 players to game
//need to start game when 4 players are added


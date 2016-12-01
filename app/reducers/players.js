import * as firebase from 'firebase'
//import {startTheGame} from './home';
/* -----------------    ACTIONS     ------------------ */

const LOAD_PLAYERS = 'LOAD_PLAYERS'
const ADD_PLAYER = 'ADD_PLAYER'
const INCREMENT_RESOURCE = 'INCREMENT_RESOURCE'
const DECREMENT_RESOURCE = 'DECREMENT_RESOURCE'

const ADD_POINT = 'ADD_POINT'


/* ------------   ACTION CREATORS     ------------------ */
const load  = players => ({ type: LOAD_PLAYERS, players })
const add  = player => ({ type: ADD_PLAYER, player })

export const addPlayer  = player => ({ type: ADD_PLAYER, player }) //, color })
export const incrementResource = (player, resource, count) => ({ type: INCREMENT_RESOURCE, player, resource, count})
export const decrementResource = (player, resource, count) => ({ type: DECREMENT_RESOURCE, player, resource, count})

export const addPoint = (userIndex) => ({ type: ADD_POINT, userIndex })


/* ------------       REDUCER     ------------------ */

export default function reducer (players = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      return players.concat([{name: action.player, cardsTotal: function(){
        return Object.keys(this.cardsResource).map(resource => this.cardsResource[resource]).reduce((a,b) => a+b)
        }, 
        cardsResource: {crops: 0, fuel: 0, hematite: 0, ice: 0, solar: 0}, 
        points: 0, 
        hasBoughtARoad: false, 
        hasBoughtASettlement: false
        // , 
        // color: action.color
      }]);
    case INCREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource] += action.count;
          return player
        }
        else return player
      })
    case DECREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource] -= action.count;
          return player
        }
        else return player
      })

    case ADD_POINT:
     return players.map(player => {
      if (player.name === action.player) {
        ++player.points;
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


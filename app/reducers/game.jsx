import * as firebase from 'firebase'
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const JOIN_GAME = 'JOIN_GAME'
const LOAD_GAMES = 'LOAD_GAMES'

/* ------------   ACTION CREATORS     ------------------ */

export const join = gameID => ({ type: JOIN_GAME, gameID })
export const listen = games => ({type: LOAD_GAMES, games})

/* ------------       REDUCER     ------------------ */

export default function reducer (gameID = null, action) {
  switch (action.type) {

    case JOIN_GAME: 
      return action.gameID
    default:
      return gameID;
  }
}

export const games = function (games = {}, action) {
  switch (action.type) {

    case LOAD_GAMES: 
      return action.games 
    
    default:
      return games;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const listenGames = () => dispatch => {
	firebase.database().ref().child('games').on('value', (snap) => {
		dispatch(listen(snap.val()))
	})
}

export const newGame = (text) => dispatch => {
	var newGame = firebase.database().ref().child('games').push({name: text, actions: false, messages: false}).key
	browserHistory.push(`/game/${newGame}`)
}

export const turnOffGamesListener = () => dispatch => {
  firebase.database().ref().child('games').off()
}


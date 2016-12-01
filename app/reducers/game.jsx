import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const JOIN_GAME = 'JOIN_GAME'
const LOAD_GAMES = 'LOAD_GAMES'
/* ------------   ACTION CREATORS     ------------------ */

export const join = gameID => ({ type: JOIN_GAME, gameID })
export const listen = game => ({type: LOAD_GAMES, game})

/* ------------       REDUCER     ------------------ */

export default function reducer (gameID = null, action) {
  switch (action.type) {

    case JOIN_GAME: 
      return action.gameID

    default:
      return gameID;
  }
}

export const games = function (games = [], action) {
  switch (action.type) {

    case LOAD_GAMES: 
      return games.concat(action.game)

    default:
      return games;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const listenGames = () => dispatch => {
	firebase.database().ref().child('games').on('child_added', (snap) => {
		console.log(snap.val())
		dispatch(listen(snap.val()))
	})
}

export const newGame = () => dispatch => {
	firebase.database().ref().child('games').push({actions: false, messages: false})
}


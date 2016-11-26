import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const SET_NEXT_TURN = 'SET_NEXT_TURN';

/* ------------   ACTION CREATORS     ------------------ */

const setNextTurn = (player) => ({ type: SET_NEXT_TURN, player })

/* ------------       REDUCER     ------------------ */
                                //whoseTurn is an object that points to a specific player, 1 - 4
export default function reducer (whoseTurn = 1, action) {
  switch (action.type) {
    case SET_NEXT_TURN:
      return action.player
    default:
      return whoseTurn;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const endTurn = (player) => dispatch => {
  player === 4 ? player = 1 : player++ //if we're on the 4th player, set the next player to player 1, else set the next player as one after
  dispatch(setNextTurn(player));
}
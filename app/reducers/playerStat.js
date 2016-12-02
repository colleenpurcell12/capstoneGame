/* -----------------    ACTIONS     ------------------ */

const SET_NEXT_TURN = 'SET_NEXT_TURN';

/* ------------   ACTION CREATORS     ------------------ */

export const setNextTurn = (player) => ({ type: SET_NEXT_TURN, player })

/* ------------       REDUCER     ------------------ */
                             //turnInfo is an object that points to a player ID, 1 - 4
export default function reducer (turnInfo= 1, action){
    switch (action.type) {
    case SET_NEXT_TURN:
      return action.player
    default:
      return turnInfo
  }
}

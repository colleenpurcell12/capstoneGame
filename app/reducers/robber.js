import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const MOVE_ROBBER = 'MOVE_ROBBER';

/* ------------   ACTION CREATORS     ------------------ */

const moveRobber = (hexID) => ({ type: MOVE_ROBBER, hexID })

/* ------------       REDUCER     ------------------ */
                             //whoseTurn is an object that points to a specific player ID, 1 - 4
export default function reducer (robberHex= 0, action){
    switch (action.type) {
    case MOVE_ROBBER:
      return action.hexID
    default:
      return robberHex
  }
}

/* ------------      DISPATCHERS     ------------------ */

export const endTurn = (hexID) => dispatch => {
    dispatch(setNextTurn(hexID));
}

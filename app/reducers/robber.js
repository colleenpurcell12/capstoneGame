/* -----------------    ACTIONS     ------------------ */

const MOVE_ROBBER = 'MOVE_ROBBER';

/* ------------   ACTION CREATORS     ------------------ */

export const moveRobber = (hexID) => ({ type: MOVE_ROBBER, hexID })

/* --------------       REDUCER     ------------------ */
                             //whoseTurn is an object that points to a specific player ID, 1 - 4
export default function reducer (robberHex= null, action){
    switch (action.type) {
    case MOVE_ROBBER:
      return action.hexID
    default:
      return robberHex
  }
}

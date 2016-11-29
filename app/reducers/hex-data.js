import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

 const ASSIGN_HEX_DATA = 'ASSIGN_HEX_DATA';


/* ------------   ACTION CREATORS     ------------------ */

export const assignHexData = (hexes) => ({ type: ASSIGN_HEX_DATA, hexes})

/* ------------       REDUCER     ------------------ */


export default function hexData (hexData = {}, action){

  switch (action.type) {
    case ASSIGN_HEX_DATA:
      return action.hexes
    default:
      return hexData;
  }
}

/* ------------      DISPATCHERS     ------------------ */

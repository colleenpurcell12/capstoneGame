import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const DICE_ROLL = 'DICE_ROLL';

/* ------------   ACTION CREATORS     ------------------ */

const newDiceRoll = diceRoll => ({ type: DICE_ROLL, diceRoll }) //payload is called 'diceRoll'

/* ------------       REDUCER     ------------------ */
                                //diceRoll is defined one-level deep, but the default could also point to {}
export default function reducer (diceRoll = {sum: 2, isDouble: false}, action) {
  switch (action.type) {
    case DICE_ROLL:
      return action.diceRoll
    default:
      return diceRoll;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const setDiceRoll = diceRoll => dispatch => {
  dispatch(newDiceRoll(diceRoll))
}

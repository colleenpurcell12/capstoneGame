
/* -----------------    ACTIONS     ------------------ */

const DICE_ROLL = 'DICE_ROLL';

/* ------------   ACTION CREATORS     ------------------ */

export const newDiceRoll = diceRoll => ({ type: DICE_ROLL, diceRoll }) //payload is called 'diceRoll'

/* ------------       REDUCER     ------------------ */
                                //diceRoll is defined one-level deep, but the default could also point to {}
export default function reducer (diceRoll = {d1: null, d2: null, diceEnabled: true, stealEnabled: false}, action) {
  switch (action.type) {
    case DICE_ROLL:
      return action.diceRoll
    default:
      return diceRoll;
  }
}



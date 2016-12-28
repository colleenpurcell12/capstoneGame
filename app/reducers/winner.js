
/* -----------------    ACTIONS     ------------------ */

export const DECLARE_WINNER = 'DECLARE_WINNER';

/* ------------   ACTION CREATORS     ------------------ */

export const declareWinner = player => ({ type: DECLARE_WINNER, player }) //payload is called 'diceRoll'

/* ------------       REDUCER     ------------------ */
                                //diceRoll is defined one-level deep, but the default could also point to {}
export default function reducer (winner = null, action) {
  switch (action.type) {
    case DECLARE_WINNER:
      return action.player
    default:
      return winner;
  }
}




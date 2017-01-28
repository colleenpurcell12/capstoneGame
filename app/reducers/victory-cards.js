
/* -----------------    ACTIONS     ------------------ */

const ASSIGN_VICTORY_CARDS = 'ASSIGN_VICTORY_CARDS'

/* ------------   ACTION CREATORS     ------------------ */

export const assignVictoryCards = assignedPlayers => ({ type: ASSIGN_VICTORY_CARDS, assignedPlayers }) //payload is called 'diceRoll'

/* ------------       REDUCER     ------------------ */
export default function reducer (victoryCards = {road: false, army: false}, action) {
  switch (action.type) {
    case ASSIGN_VICTORY_CARDS:
      return action.assignedPlayers
    default:
      return victoryCards
  }
}

/* ----------------       ACTIONS       ------------------ */
const DRAW_CARD = 'DRAW_CARD';
const INITIALIZE_DECK = 'INITIALIZE_DECK'

/* ----------------   ACTION CREATORS   ------------------ */
export const drawCard = () => ({ type: DRAW_CARD })
export const initializeDeck = (deck) => ({type: INITIALIZE_DECK, deck}) // payload is a shuffled deck

/* ----------------       REDUCER       ------------------ */
export default function reducer (deck = [] , action){
  switch (action.type) {
    case INITIALIZE_DECK:
      return action.deck
    case DRAW_CARD:
      return deck.slice(1)
    default:
      return deck
  }
}

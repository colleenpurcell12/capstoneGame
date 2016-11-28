/* -----------------    ACTIONS     ------------------ */

const ADD_PLAYER = 'ADD_PLAYER'

/* ------------   ACTION CREATORS     ------------------ */

export const addPlayer  = player => ({ type: ADD_PLAYER, player }) //where is this being implemented? -SC

/* ------------       REDUCER     ------------------ */

export default function reducer (players = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      return players.concat([{name: action.player, cardsTotal: 0, cardsResource: {lumber: 0, ore: 0, grain:0, wool: 0, brick: 0}, points: 0, startRoad: null, startSettlement: null}]);
    default:
      return players;
  }
}

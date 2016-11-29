/* -----------------    ACTIONS     ------------------ */

const ADD_PLAYER = 'ADD_PLAYER'
const INCREMENT_RESOURCE = 'INCREMENT_RESOURCE'
const DECREMENT_RESOURCE = 'DECREMENT_RESOURCE'

/* ------------   ACTION CREATORS     ------------------ */

export const addPlayer  = player => ({ type: ADD_PLAYER, player })
export const incrementResource = (player, resource) => ({ type: INCREMENT_RESOURCE, player, resource})
export const decrementResource = (player, resource) => ({ type: DECREMENT_RESOURCE, player, resource})

/* ------------       REDUCER     ------------------ */

export default function reducer (players = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      return players.concat([{name: action.player, cardsTotal: function(){
        return Object.keys(this.cardsResource).map(resource => this.cardsResource[resource]).reduce((a,b) => a+b)    
        }, cardsResource: {lumber: 0, ore: 0, grain:0, wool: 0, brick: 0}, points: 0, startRoad: null, startSettlement: null}]);
    case INCREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource]++
          return player
        }
        else return player
      })
    case DECREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource]--
          return player
        }
        else return player
      })
    default:
      return players;
  }
}

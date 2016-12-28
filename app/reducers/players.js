/* -----------------    ACTIONS     ------------------ */

const LOAD_PLAYERS = 'LOAD_PLAYERS'
const ADD_PLAYER = 'ADD_PLAYER'
const INCREMENT_RESOURCE = 'INCREMENT_RESOURCE'
const DECREMENT_RESOURCE = 'DECREMENT_RESOURCE'
const ADD_POINT = 'ADD_POINT'
const SUBTRACT_POINT = 'SUBTRACT_POINT'
const HAS_BOUGHT= 'HAS_BOUGHT'
const HAS_NOT_BOUGHT = 'HAS_NOT_BOUGHT'

/* ------------   ACTION CREATORS     ------------------ */
const load  = players => ({ type: LOAD_PLAYERS, players })
const add  = player => ({ type: ADD_PLAYER, player })

export const addPlayer  = player => ({ type: ADD_PLAYER, player }) //, color })
export const incrementResource = (player, resource, count) => ({ type: INCREMENT_RESOURCE, player, resource, count})
export const decrementResource = (player, resource, count) => ({ type: DECREMENT_RESOURCE, player, resource, count})

export const addPoint = (player) => ({ type: ADD_POINT, player })
export const subtractPoint = (player, points) => ({ type: SUBTRACT_POINT, player, points })

export const hasBought = (name, property) => ({ type: HAS_BOUGHT, name, property })
export const hasNotBought = (name, property) => ({ type: HAS_NOT_BOUGHT, name, property })

/* ------------       REDUCER     ------------------ */

export default function reducer (players = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      return players.concat([{name: action.player, cardsTotal: function(){
        return Object.keys(this.cardsResource).map(resource => this.cardsResource[resource]).reduce((a,b) => a+b)
        }, 
        cardsResource: {crops: 0, fuel: 0, iron: 0, ice: 0, solar: 0}, 
        points: 0, 
        hasBoughtARoad: false, 
        hasBoughtASettlement: false
        // , 
        // color: action.color
      }]);
    case INCREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource] += action.count;
          return player
        }
        else return player
      })
    case DECREMENT_RESOURCE:
      return players.map(player => {
        if (player.name === action.player) {
          player.cardsResource[action.resource] -= action.count;
          return player
        }
        else return player
      })
    case ADD_POINT:
     return players.map(player => {
      if (player.name === action.player) {
        player.points++;
        return player
        }
        else return player
     })
    case SUBTRACT_POINT:
     return players.map(player => {
      if (player.name === action.player) {
        player.points -= action.points;
        return player
        }
        else return player
     })
     case HAS_BOUGHT:
     return players.map(player => {
      if (player.name === action.name) {
        let { property } = action;
        player[property] = true;
        return player
        }
        else return player
     })
     case HAS_NOT_BOUGHT:
     return players.map(player => {
      if (player.name === action.name) {
        let { property } = action;
        player[property] = false;
        return player
        }
        else return player
     })
    default:
      return players;
  }
}

 //import * as firebase from 'firebase'

// payload of registerRoad
//{type: 'Road', points: 1, coordinates: [[x,y],[x,y]], associatedHexs = [2 border hexes], color: blue, userID: 1}]

// payload of registerSettlement
//{type: 'Settlement', points: 1 , coordinates: [[x,y]], associatedHexs = [3 touching hexes],  color: blue, userID: 1}]


/* -----------------    ACTIONS     ------------------ */

const REGISTER_ROAD = 'REGISTER_ROAD';
const REGISTER_SETTLEMENT = 'REGISTER_SETTLEMENT';

/* ------------   ACTION CREATORS     ------------------ */

const addRoadToEveryStructure = newRoad => ({ type: REGISTER_ROAD, newRoad }) 
const addSettlementToEveryStructure = newSettlement => ({ type: REGISTER_SETTLEMENT, newSettlement }) 

/* ------------       REDUCER     ------------------ */
                                //diceRoll is defined one-level deep, but the default could also point to {}
export default function reducer (everyStructure = [], action) {
  switch (action.type) {
    case REGISTER_ROAD:
      return [...everyStructure, action.newRoad]
     case REGISTER_SETTLEMENT:
      return [...everyStructure, action.newSettlement]
    default:
      return everyStructure;
  }
}

/* ------------       DISPATCHERS     ------------------ */

// export const addRoad = newRoad => dispatch => {
//   dispatch(registerRoad(newRoad))
// }
// export const addSettlement = newSettlement => dispatch => {
//   dispatch(registerSettlement(newSettlement))
// }

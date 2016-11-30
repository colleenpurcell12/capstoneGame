 //import * as firebase from 'firebase'

// payload of registerRoad
//{type: 'Road', points: 1, coordinates: [[x,y],[x,y]], associatedHexs = [2 border hexes], color: blue, userID: 1}]

// payload of registerSettlement
//{type: 'Settlement', points: 1 , coordinates: [[x,y]], associatedHexs = [3 touching hexes],  color: blue, userID: 1}]

/* -----------------    ACTIONS     ------------------ */

 const REGISTER_ROAD = 'REGISTER_ROAD';
 const REGISTER_SETTLEMENT = 'REGISTER_SETTLEMENT';
 const REGISTER_CITY = 'UPGRADE_SETTLEMENT';

/* ------------   ACTION CREATORS     ------------------ */

export const addRoadToEveryStructure = (newRoad) => ({ type: 'REGISTER_ROAD', newRoad }) 
export const addSettlementToEveryStructure = (newSettlement) => ({ type: 'REGISTER_SETTLEMENT', newSettlement }) 
export const addCityToEveryStructure = (corner_id) => ({ type: 'REGISTER_CITY', corner_id }) 

/* ------------       REDUCER     ------------------ */
                                //diceRoll is defined one-level deep, but the default could also point to {}

let initialState = [ { type: 'settlement', points: 1 , 
                            color: 'blue', userID: 2,
                            cornerId: 20,
                            coordinates: [-5.5, 9.526279441628825],  
                            associatedHexs: [10,5,9]   
                          },
                     { type: 'road', points: 0, 
                            color: 'blue', userID: 2,
                            cornerId:  [19,20],
                            coordinates: [[-5.5, 9.526279441628825],[-11,0]],
                            associatedHexs: [10,5,9,9,5,4]
                          },

                     { type: 'road', points: 0, 
                            color: 'blue', userID: 2,
                            cornerId:  [32, 20],
                            coordinates: [[-5.5, 9.526279441628825],[5.5, 9.526279441628825]],
                            associatedHexs: [10,5,9,14,10,9]
                          }
                      ] 

export default function reducer (everyStructure = [], action) {
  switch (action.type) {
    case REGISTER_ROAD:
      return [...everyStructure, action.newRoad]
    case REGISTER_SETTLEMENT:
      return [...everyStructure, action.newSettlement]
    case REGISTER_CITY:
     everyStructure.map(s => {
       if( s.cornerId === action.corner_id){
         s.type = 'city';
         s.points=2
       }
       return everyStructure;
     })
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

// import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

 const ADD_STRUCTURE = 'ADD_STRUCTURE';
 const UPGRADE_SETTLEMENT = 'UPGRADE_SETTLEMENT';

/* ------------   ACTION CREATORS     ------------------ */
//from addStructure to addBoardStructure
//from upgradeSettlement to upgradeBoardStructure
export const addBoardStructure = (structure) => ({ type: 'ADD_STRUCTURE', structure })
export const upgradeBoardStructure = (corner_id)   => ({ type: 'UPGRADE_SETTLEMENT', corner_id })

/* ------------       REDUCER     ------------------ */
  
//settlements

let initialState = [ {owner: 'blue', corner_id: 20, type: 'settlement'} ] 

export default function structures (structures = [], action){

  switch (action.type) {
    case ADD_STRUCTURE:
      return [...structures, action.structure]
      //upgrade structure
    case UPGRADE_SETTLEMENT:
     structures.map(s => {
       if( s.corner_id === action.corner_id){
         s.type = 'city';
       }
       return s;
     })
     return structures
    default:
      return structures;
  }
}

/* ------------      DISPATCHERS     ------------------ */

// export const addBoardStructure = (structure) => dispatch => {
//     dispatch(addStructure(structure));
// }
// export const upgradeBoardStructure = (corner) => dispatch => {
//     dispatch(upgradeSettlement(corner));
// }

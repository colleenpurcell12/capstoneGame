import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

 const ADD_STRUCTURE = 'ADD_STRUCTURE';
 const UPGRADE_SETTLEMENT = 'UPGRADE_SETTLEMENT';

/* ------------   ACTION CREATORS     ------------------ */

const addStructure = () => ({ type: ADD_STRUCTURE, structure })
const upgradeSettlement = (corner)   => ({ type: UPGRADE_SETTLEMENT, corner })

/* ------------       REDUCER     ------------------ */

//settlements

export default function structures (structures = [], action){

  switch (action.type) {
    case ADD_STRUCTURE:
      return [...structures, action.structure]
      //upgrade structure
    case UPGRADE_SETTLEMENT:
     structures.map(s => {
       if( s.corner_id === corner.corner_id){
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

export const addBoardStructure = (structure) => dispatch => {
    dispatch(addStructure(structure));
}
export const upgradeBoardStructure = (corner) => dispatch => {
    dispatch(upgradeSettlement(corner));
}

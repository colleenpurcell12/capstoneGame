import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const ADD_SETTLEMENT = 'ADD_SETTLEMENT'
const UPGRADE_SETTLEMENT = 'UPGRADE_SETTLEMENT'


/* ------------   ACTION CREATORS     ------------------ */

const addSettlement = (settlementObj) => ({ type: ADD_SETTLEMENT, settlementObj })
const upgradeSettlement = (corner)   => ({ type: UPGRADE_SETTLEMENT, corner })


/* ------------       REDUCER     ------------------ */

export default function reducer (settlements = [], action) {
  switch (action.type) {
    case ADD_SETTLEMENT:
      return [...settlements, action.settlementObj]
    case UPGRADE_SETTLEMENT:
      settlements.map(s => {
        if( s.corner_id === corner.corner_id){
          s.type = 'city';
        }
        return s;
      })
      return settlements
    default:
      return messages;
  }
}


/* ------------       DISPATCHERS     ------------------ */

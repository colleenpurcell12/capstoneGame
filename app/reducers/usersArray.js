import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

 //const NEXT_ROUND = 'NEXT_ROUND';

/* ------------   ACTION CREATORS     ------------------ */

// const nextRound = () => ({ type: NEXT_ROUND })


/* ------------       REDUCER     ------------------ */

let initialUserArray = [
  	{id: 1, 
    selection: [ ], 
    color: 'red', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 3, 
    cardsResource: {type1: 2 , type2: 2, type3: 3, type4: 3, type5: 3}
    },
 	{id: 2, 
    selection: [ ], 
    color: 'blue', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 0, 
    cardsResource: {type1: 2 , type2: 2, type3: 2, type4: 2, type5: 2}
    },
    {id: 3, 
    selection: [ ], 
    color: 'green', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 0, 
    cardsResource: {type1: 2 , type2: 2, type3: 2, type4: 2, type5: 2}
    },
    {id: 4, 
    selection: [ ], 
    color: 'yellow', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 0, 
    cardsResource: {type1: 3 , type2: 3, type3: 3, type4: 3, type5: 3}
    }
    ]
export default function userArray (userArray = initialUserArray, action){
    switch (action.type) {
    default:
      return userArray
  }
}


/* ------------      DISPATCHERS     ------------------ */

// export const setNextRound = () => dispatch => {
//     dispatch(nextRound());
//     dispatch(nextRoundStep2());
// }

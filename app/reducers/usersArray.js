import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

 const ADD_POINT = 'ADD_POINT';

/* ------------   ACTION CREATORS     ------------------ */

export const addPoint = (userIndex) => ({ type: ADD_POINT, userIndex })


/* ------------       REDUCER     ------------------ */
//selection: [ ], taken out since can't select corners if it isn't your turn

let initialUserArray = [
  	{id: 1, 
    color: 'red', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 3, 
    cardsResource: {type1: 2 , type2: 2, type3: 3, type4: 3, type5: 3}
    },
 	{id: 2, 
    color: 'blue', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 0, 
    cardsResource: {type1: 2 , type2: 2, type3: 2, type4: 2, type5: 2}
    },
    {id: 3, 
    color: 'green', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 0, 
    cardsResource: {type1: 2 , type2: 2, type3: 2, type4: 2, type5: 2}
    },
    {id: 4, 
    color: 'yellow', 
    hasBoughtARoad: false, 
    hasBoughtASettlement: false, 
    points: 0, 
    cardsResource: {type1: 3 , type2: 3, type3: 3, type4: 3, type5: 3}
    }
    ]
export default function userArray (userArray = initialUserArray, action){
    switch (action.type) {
    case ADD_POINT:
     return ++userArray[userIndex].points
    default:
      return userArray
  }
}


/* ------------      DISPATCHERS     ------------------ */

// export const setNextRound = () => dispatch => {
//     dispatch(nextRound());
//     dispatch(nextRoundStep2());
// }

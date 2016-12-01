import * as firebase from 'firebase'

let initialState = [{ id: 0,  color: 'red' }, { id: 1,  color: 'blue' }, 
                    { id: 2,  color: 'green' }, { id: 3,  color: 'yellow' }]

export default function userArray (userArray = initialState, action){
    switch (action.type) {
    default:
      return userArray
  }
}

/* -----------------    ACTIONS     ------------------ */

 // const ADD_POINT = 'ADD_POINT';
 // const TAKE_CARDS = 'TAKE_CARDS';

 //const LOAD_PLAYERS = 'LOAD_PLAYERS'

/* ------------   ACTION CREATORS     ------------------ */

// const load  = players => ({ type: LOAD_PLAYERS, players })
// const add  = player => ({ type: ADD_PLAYER, player })

// export const addPoint = (userIndex) => ({ type: ADD_POINT, userIndex })
// export const payForEquipment = (resourceNumUserIdxObj) => ({ type: TAKE_CARDS, resourceNumUserIdxObj })

// export const addAPlayer  = player => ({ type: ADD_PLAYER, player })
// export const increResource = (player, resource, count) => ({ type: INCREMENT_RESOURCE, player, resource, count})
// export const decreResource = (player, resource, count) => ({ type: DECREMENT_RESOURCE, player, resource, count})


/* ------------       REDUCER     ------------------ */
//selection: [ ], taken out since can't select corners if it isn't your turn

// let initialUserArrayOld = [
//   	{id: 1, 
//     color: 'red', 
//     hasBoughtARoad: false, 
//     hasBoughtASettlement: false, 
//     points: 3, 
//     cardsResource: {type1: 2 , type2: 2, type3: 3, type4: 3, type5: 3},
//     displayName: 'Colleen'
//     },
//  	{id: 2, 
//     color: 'blue', 
//     hasBoughtARoad: false, 
//     hasBoughtASettlement: false, 
//     points: 0, 
//     cardsResource: {type1: 2 , type2: 2, type3: 2, type4: 2, type5: 2},
//     displayName: 'Sami'
//     },
//     {id: 3, 
//     color: 'green', 
//     hasBoughtARoad: false, 
//     hasBoughtASettlement: false, 
//     points: 0, 
//     cardsResource: {type1: 2 , type2: 2, type3: 2, type4: 2, type5: 2},
//     displayName: 'Sharon'
//     },
//     {id: 4, 
//     color: 'yellow', 
//     hasBoughtARoad: false, 
//     hasBoughtASettlement: false, 
//     points: 0, 
//     cardsResource: {type1: 3 , type2: 3, type3: 3, type4: 3, type5: 3},
//     displayName: 'Deborah',
//     }
//     ]
// export default function userArray (userArray = initialUserArray, action){
//     switch (action.type) {
//     case ADD_POINT:
//      let idx = action.userIndex
//      userArray[idx].points = userArray[idx].points+1
//      return userArray
//     case TAKE_CARDS:
//      let { resourceNumUserIdxObj } = action
//      let { resource, userIndex, num } = resourceNumUserIdxObj
//      userArray[userIndex].cardsResource[resource] -= num
//     return userArray
//     default:
//       return userArray
//   }
// }

/* ------------      DISPATCHERS     ------------------ */

// export const setNextRound = () => dispatch => {
//     dispatch(nextRound());
//     dispatch(nextRoundStep2());
// }

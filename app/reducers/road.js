/* -----------------    ACTIONS     ------------------ */

const ADD_ROAD = 'ADD_ROAD';

/* ------------   ACTION CREATORS     ------------------ */

export const addRoadToRoads = (road) => ({ type: 'ADD_ROAD', road })

/* ------------       REDUCER     ------------------ */

//10,5,4

// let initialState = [ { color: 'blue', corners:  [19,20], userID: 2, 
// 					           coordinates: [[-5.5, 9.526279441628825],[-11,0]]  
//                     },

//                      { color: 'blue', corners:  [32, 20], userID: 2, 
//                      coordinates: [[-5.5, 9.526279441628825],[5.5, 9.526279441628825]]
//                     }
//                       ] 

export default function roads (roads = [], action){

  switch (action.type) {
    case ADD_ROAD:
      return [...roads, action.road]
    default:
      return roads;
  }
}

//import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const ADD_ROAD = 'ADD_ROAD';

/* ------------   ACTION CREATORS     ------------------ */

export const addRoadToRoads = (road) => ({ type: 'ADD_ROAD', road })

/* ------------       REDUCER     ------------------ */

//10,5,4

let initialState = [ { type: 'road', points: 0, 
					  coordinates: [[-5.5, 9.526279441628825],[-11,0]],
                      corners:  [19,20],
                      associatedHexs: [10,5,9,9,5,4], color: 'blue', userID: 2 },

                      { type: 'road', points: 0, 
                      coordinates: [[-5.5, 9.526279441628825],[5.5, 9.526279441628825]],
                      corners:  [32, 20],
                      associatedHexs: [10,5,9,14,10,9], color: 'blue', userID: 2 }
                      ] 

export default function roads (roads = initialState, action){

  switch (action.type) {
    case ADD_ROAD:
      return [...roads, action.road]
    default:
      return roads;
  }
}

/* ------------      DISPATCHERS     ------------------ */

// export const addBoardRoad = () => dispatch => {
//     dispatch(addRoadToRoads(road)); //changed from addRoad

// }

//import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const ADD_ROAD = 'ADD_ROAD';

/* ------------   ACTION CREATORS     ------------------ */

export const addRoadToRoads = (road) => ({ type: 'ADD_ROAD', road })

/* ------------       REDUCER     ------------------ */

//settlements

export default function roads (roads = [], action){

  switch (action.type) {
    case ADD_ROAD:
      return [...roads, action.structure]
    default:
      return roads;
  }
}

/* ------------      DISPATCHERS     ------------------ */

// export const addBoardRoad = () => dispatch => {
//     dispatch(addRoadToRoads(road)); //changed from addRoad

// }

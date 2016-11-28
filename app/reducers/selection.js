import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

 const ADD_SELECTION = 'ADD_SELECTION';

/* ------------   ACTION CREATORS     ------------------ */

const addSelection = () => ({ type: ADD_SELECTION, selection })

/* ------------       REDUCER     ------------------ */

//firstCorner corner obj
//secondCorner

export default function selections (selections = [], action){

  switch (action.type) {
    case ADD_SELECTION:
      return [...selections, action.selection]
    default:
      return selections;
  }
}

/* ------------      DISPATCHERS     ------------------ */

export const addBoardSelection = () => dispatch => {
    dispatch(addSelection(selection));

}

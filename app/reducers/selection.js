import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const ADD_SELECTION = 'ADD_SELECTION';
const REMOVE_SELECTION = 'REMOVE_SELECTION';
const CLEAR_SELECTION = 'CLEAR_SELECTION';

/* ------------   ACTION CREATORS     ------------------ */

const addSelection = (selection) => ({ type: ADD_SELECTION, selection })
const removeSelection = (id) => ({type: REMOVE_SELECTION, id})
const clearSelection = () => ({type: CLEAR_SELECTION})

/* ------------       REDUCER     ------------------ */

//firstCorner corner obj
//secondCorner

export default function selections (selections = [], action){
  switch (action.type) {
    case ADD_SELECTION:
      return [...selections, action.selection];
    case REMOVE_SELECTION:
      return selections.filter(s => (s.id !== action.id));
    case CLEAR_SELECTION:
      return [];
    default:
      return selections;
  }
}

/* ------------      DISPATCHERS     ------------------ */

export const addBoardSelection = (selection) => dispatch => {
  dispatch(addSelection(selection));
}
export const removeBoardSelection = (id) => dispatch => {
  dispatch(removeSelection(id));
}

export const clearBoardSelection = ()=> dispatch => {
  dispatch(clearSelection());
}

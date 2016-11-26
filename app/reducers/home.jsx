import * as firebase from 'firebase';
import {listenToAuth} from './login';
/* -----------------    ACTIONS     ------------------ */

const INITIALIZE_GAME = 'INITIALIZE_GAME';

/* ------------   ACTION CREATORS     ------------------ */

const startGame = bool => ({ type: INITIALIZE_GAME, bool }) //payload is called 'diceRoll'

/* ------------       REDUCER     ------------------ */
                                  //game is not in progress by default
export default function reducer (inProgress = false, action) {
  switch (action.type) {
    case INITIALIZE_GAME:
      return action.bool
    default:
      return inProgress;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const startTheGame = (bool) => dispatch => {
  dispatch(startGame(bool));
}

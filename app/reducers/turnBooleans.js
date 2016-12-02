import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

 const NEXT_ROUND = 'NEXT_ROUND';
 const NEXT_ROUND_STEP2 = 'NEXT_ROUND_STEP2';
 const START_GAME_PLAY = 'START_GAME_PLAY';
 const SHIFT_TURNS = 'SHIFT_TURNS';

/* ------------   ACTION CREATORS     ------------------ */

export const nextRound = () => ({ type: NEXT_ROUND })
export const nextRoundStep2 = () => ({ type: NEXT_ROUND_STEP2 })
export const shiftTurns = () => ({ type: SHIFT_TURNS }) //
export const startNormGamePlay = () => ({ type: START_GAME_PLAY })

/* ------------       REDUCER     ------------------ */

export function isFirstRound (isFirstRound = true, action){
    switch (action.type) {
    case NEXT_ROUND:
      return false
    default:
      return isFirstRound
  }
}

export function isSettingUp (isSettingUp = true, action){
    switch (action.type) {
    case START_GAME_PLAY:
      return false
    default:
      return isSettingUp
  }
}

export function turnArray (turnArray= [2,3,4], action){
    switch (action.type) {
    case NEXT_ROUND_STEP2:
      return [3,2,1]
    case SHIFT_TURNS:
      return turnArray.slice(1)
    default:
      return turnArray
  }
}

/* ------------      DISPATCHERS     ------------------ */

// export const setNextRound = () => dispatch => {
//     dispatch(nextRound());
//     dispatch(nextRoundStep2());
// }
// export const endSetUp = () => dispatch => {
//     dispatch(startNormGamePlay());
// }
// export const nextTurn = () => dispatch => {
//     dispatch(shiftTurns());
// }

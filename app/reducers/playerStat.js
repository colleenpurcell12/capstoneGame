import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const SET_NEXT_TURN = 'SET_NEXT_TURN';
// const NEXT_ROUND = 'NEXT_ROUND';
// const START_GAME_PLAY = 'START_GAME_PLAY';

/* ------------   ACTION CREATORS     ------------------ */

const setNextTurn = (player) => ({ type: SET_NEXT_TURN, player })
// const nextRound = () => ({ type: NEXT_ROUND })
// const startNormGamePlay = () => ({ type: START_GAME_PLAY })

/* ------------       REDUCER     ------------------ */
                             //whoseTurn is an object that points to a specific player ID, 1 - 4

export default function reducer (whoseTurn= 1, action){
    switch (action.type) {
    case SET_NEXT_TURN:
      return action.player
    default:
      return whoseTurn
  }
}

/* ------------      DISPATCHERS     ------------------ */

export const endTurn = (player) => dispatch => {
    player === 4 ? player = 1 : player++ 
    //console.log("XXX NEXT player is number",player)
    dispatch(setNextTurn(player));
}

/* ------------    PRIOR   REDUCER     ------------------ */

//export default function reducer (state = {whoseTurn : 1, isSettingUp: true, isFirstRound: true }, action) {

  // let turnsArr = [1,2,3,4];
  // let isSettingUp = true;
  // let isFirstRound = true;

//LAST TRY
// let initialState= { //turnInfo: { 
//   whoseTurn: 1, turnsArr: [1,2,3,4], isSettingUp: true, isFirstRound: true }
// //}

// export default function reducer (state = initialState , action){
//     switch (action.type) {
//     case SET_NEXT_TURN:
//       return {...state, 
//           whoseTurn: action.player
//       }
//     default:
//       return state;
//   }
// }

//PRIOR PRIOR TRY

// export default function reducer (turnState = { whoseTurn: 1, turnsArr: [1,2,3,4], isSettingUp: true, isFirstRound: true }, action) {

//   switch (action.type) {
//     case SET_NEXT_TURN:
//       return //action.player
//       {...state,
//         turnState: {
//           ...state.turnState,
//           whoseTurn: action.player
//         }
//       }
//     case NEXT_ROUND:
//       return { ...state,
//           turnState: {
//             ...state.turnState,
//             whoseTurn: 4,       //both sets whose turn and fills in remaining turns
//             turnsArr: [3,2,1],
//             isFirstRound: false
//           }
//       }
//     case START_GAME_PLAY:
//       return { ...state,
//           turnState: {
//             ...state.turnState,
//             whoseTurn: 1,
//             isSettingUp: false
//           }
//       }

//     default:
//       return turnState;
//       //return state
//   }
// }

/* ------------       PAST DISPATCHERS     ------------------ */

/*
import store from '../store.js'
export const endTurn = (player) => dispatch => {

  //need to move these to another part of the state so they only get called once...??**
  
  //console.log(store.getState())
  let { turnState } = store.getState();
  let { isSettingUp, isFirstRound, turnsArr } = turnState
  //Normal cycle of turns during game play, increment user to x+1 
  if (isSettingUp === false){
    player === 4 ? player = 1 : player++ 
    dispatch(setNextTurn(player));
  } 

  //isSettingUp === true, tracks 1st and 2nd round, ascending then descending
  else {
    //check if end of 1st round
    if (isFirstRound === true && turnsArr.length === 0){ 
      dispatch(nextRound()); //which sets whoseTurn to 4, turnsArr to [3,2,1]) and isFirstRound = false
    }
    //check if end of 2nd round, therefore end of set up phase
    else if (isFirstRound === false && turnsArr.length === 0) { 
      // initialize normal cycle of turns
      dispatch(startNormGamePlay()); // which sets whoseTurn to 1 and isSettingUp ==false
    }
    //within either round
    else {
      player = turnsArr.shift() 
      dispatch(setNextTurn(player));
    }
  }
  //sets whoseTurn to player's ID
  console.log("The turnsArr is",turnsArr,"and isSettingUp? is",isSettingUp,"and isFirstRound? is",isFirstRound)
  

  //if we're on the 4th player, set the next player to player 1, else set the next player as one after
  // player === 4 ? player = 1 : player++ 
  // dispatch(setNextTurn(player));
}
 */

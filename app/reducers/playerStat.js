import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const SET_NEXT_TURN = 'SET_NEXT_TURN';
//const  = 'SET_NEXT_TURN';


/* ------------   ACTION CREATORS     ------------------ */

const setNextTurn = (player) => ({ type: SET_NEXT_TURN, player })


/* ------------       REDUCER     ------------------ */
                             //whoseTurn is an object that points to a specific player ID, 1 - 4
//export default function reducer (state = {whoseTurn : 1, isSettingUp: true, isFirstRound: true }, action) {
export default function reducer (whoseTurn = 1, action) {

  switch (action.type) {
    case SET_NEXT_TURN:
      return action.player
    default:
      return whoseTurn;
      //return state
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const endTurn = (player) => dispatch => {
  // player === 4 ? player = 1 : player++ //if we're on the 4th player, set the next player to player 1, else set the next player as one after

  //need to move these to another part of the state so they only get called once...??**
  /*
  let turnsArr = [1,2,3,4];
  let isSettingUp = true;
  let isFirstRound = true;

  //Normal cycle of turns during game play, increment user to x+1 
  if (isSettingUp === false){
    player === 4 ? player = 1 : player++ 
  } 

  //Set up phase, tracks 1st and 2nd round, ascending then descending
  else { //if (isSettingUp === true)
    //end of 1st round
    if (isFirstRound === true && turnsArr.length === 0){ 
      turnsArr = turnsArr.concat([4,3,2,1])
      isFirstRound = false
      player = turnsArr.shift()
    }
    //end of 2nd round
    else if (isFirstRound === false && turnsArr.length === 0) { 
      isSettingUp ==false
      // initialize normal cycle of turns
      player = 1;
    }
    //within either round
    else {
      player = turnsArr.shift() 
    }
  }
  //sets whoseTurn to player's ID
  console.log("The turnsArr is",turnsArr,"and isSettingUp? is",isSettingUp,"and isFirstRound? is",isFirstRound)
  */
  player === 4 ? player = 1 : player++ 
  dispatch(setNextTurn(player));
}

// the initialState of the turnsArr is [1,2,3,4]

// Normal cycle of turns

// if (isSettingUp === false){
//   if (whoseTurn < 4){ whoseTurn: ++whoseTurn }  //then increment userID to x+1, 
//   else if (whoseTurn === 4) { whoseTurn: 1 } //set whoseTurn to userID of 1

// During set up, turns go from 1 to 4 in the 1st round 
// and from 4 to 1 in the 2nd round, then set up is over.

// if (isSettingUp === true){
//   //end of 1st round
//   if (isFirstRound === true && turnsArr.length === 0){ 
//     turnsArr: turnsArr.concat([4,3,2,1])
//     isFirstRound === false
//     whoseTurn: turnsArr.shift()
//   }
//   //end of 2nd round
//   else if (isFirstRound === false && turnsArr.length === 0) { 
//     isSettingUp === false
   //initialize normal cycle of turns
//     whoseTurn: 1;
//   }
//   //within either round
//   else {
//     whoseTurn: turnsArr.shift() 
//   }
//}



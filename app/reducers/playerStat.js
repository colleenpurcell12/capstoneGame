import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const SET_NEXT_TURN = 'SET_NEXT_TURN';

/* ------------   ACTION CREATORS     ------------------ */

const setNextTurn = (player) => ({ type: SET_NEXT_TURN, player })

// the initialState of the turnsArr is [1,2,3,4]

// Normal cycle of turns

// if (isSettingUp === false){
// 	 if (whoseTurn < 4){ whoseTurn: ++whoseTurn }  //then increment userID to x+1, 
// 	 else if (whoseTurn === 4) { whoseTurn: 1 } //set whoseTurn to userID of 1

// During set up, turns go from 1 to 4 in the 1st round 
// and from 4 to 1 in the 2nd round, then set up is over.

// if (isSettingUp === true){
//	 //end of 1st round
//   if (isFirstRound === true && turnsArr.length === 0){ 
//     turnsArr: turnsArr.concat([4,3,2,1])
//     isFirstRound === false
//     whoseTurn: turnsArr.shift()
//   }
//	 //end of 2nd round
//   else if (isFirstRound === false && turnsArr.length === 0) { 
//     isSettingUp === false
	 //initialize normal cycle of turns
//	   whoseTurn: 1;
//   }
//	 //within either round
//   else {
//     whoseTurn: turnsArr.shift() 
//   }
//}


/* ------------       REDUCER     ------------------ */
                             //whoseTurn is an object that points to a specific player ID, 1 - 4
export default function reducer (whoseTurn = 1, action) {
  switch (action.type) {
    case SET_NEXT_TURN:
      return action.player
    default:
      return whoseTurn;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const endTurn = (player) => dispatch => {
  player === 4 ? player = 1 : player++ //if we're on the 4th player, set the next player to player 1, else set the next player as one after
  dispatch(setNextTurn(player));
}

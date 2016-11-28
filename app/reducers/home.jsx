/* -----------------    ACTIONS     ------------------ */

const INITIALIZE_GAME = 'INITIALIZE_GAME';

/* ------------   ACTION CREATORS     ------------------ */

export const startGame = bool => ({ type: INITIALIZE_GAME, bool }) //payload is called 'diceRoll'
//const startGame = bool => ({ type: INITIALIZE_GAME, bool })

/* ------------       REDUCER     ------------------ */

//initialize game
// set startRoad=null and startSettlement=null for each player
// enable 'Roll Dice' button
// Display name associated with tbe whoseTurn ID at the top of gmae board

// initialial state:
// inProgress = true
// isSettingUp = true
// isFirstRound = true


//export default function reducer ( state = {inProgress: false, isSettingUp: true, isFirstRound: true} , action) {
                                  //game is not in progress by default
export default function reducer ( inProgress = false , action) {

  switch (action.type) {
    case INITIALIZE_GAME:
      return action.bool
    default:
      return inProgress
  }
}



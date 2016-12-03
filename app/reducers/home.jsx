/* -----------------    ACTIONS     ------------------ */

const INITIALIZE_GAME = 'INITIALIZE_GAME';

/* ------------   ACTION CREATORS     ------------------ */

export const startGame = bool => ({ type: INITIALIZE_GAME, bool }) 

/* ------------       REDUCER     ------------------ */
                                  //game is not in progress by default
export default function reducer (inProgress = false, action) {
  switch (action.type) {
    case INITIALIZE_GAME:
      return action.bool
    default:
      return inProgress
  }
}

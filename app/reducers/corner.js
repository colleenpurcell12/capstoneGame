
// corners={this.state.corners} from Board

/* -----------------    ACTIONS     ------------------ */

const PUT_CORNERS = 'PUT_CORNERS';

/* ------------   ACTION CREATORS     ------------------ */

export const putCorners = corners => ({ type: PUT_CORNERS, corners }) //payload is called 'diceRoll'

/* ------------       REDUCER     ------------------ */
export default function reducer (corners = [], action) {
  switch (action.type) {
    case PUT_CORNERS:
      return action.corners
    default:
      return corners;
  }
}



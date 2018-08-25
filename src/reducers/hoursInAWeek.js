import { SET_HOURS_IN_A_WEEK } from "../actions/types/hoursInAWeek";

const initialState = {};

function hoursInAWeek(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_HOURS_IN_A_WEEK:
      clone.hoursInAWeek = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default hoursInAWeek;

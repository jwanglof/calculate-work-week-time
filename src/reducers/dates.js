import { SET_END_DATE, SET_START_DATE } from "../actions/types/dates";

const initialState = {
  startDate: null,
  endDate: null
};

function dates(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_START_DATE:
      clone.startDate = action.data;
      return clone;
    case SET_END_DATE:
      clone.endDate = action.data;
      return clone;
    default:
      return clone;
  }
}

export default dates;

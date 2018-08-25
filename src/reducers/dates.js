import {
  SET_END_DATE,
  SET_START_DATE,
  SET_WEEK_NUMBER
} from "../actions/types/dates";

const initialState = {
  startDate: null,
  endDate: null,
  weekNumber: null
};

function dates(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_START_DATE:
      clone.startDate = action.payload;
      return clone;
    case SET_END_DATE:
      clone.endDate = action.payload;
      return clone;
    case SET_WEEK_NUMBER:
      clone.weekNumber = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default dates;

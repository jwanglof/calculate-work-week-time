import {
  SET_END_DATE,
  SET_FROM_DATE,
  SET_START_DATE,
  SET_TO_DATE,
  SET_WEEK_NUMBER,
  WEEK_SET_SELECTED_DAYS
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
    case SET_FROM_DATE:
      clone.fromDate = action.payload;
      return clone;
    case SET_TO_DATE:
      clone.toDate = action.payload;
      return clone;
    case WEEK_SET_SELECTED_DAYS:
      clone.weekSetSelectedDays = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default dates;

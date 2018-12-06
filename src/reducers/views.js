import { SHOW_DATE_VIEW } from "../actions/types/views";

const initialState = {
  dateView: false
};

function dates(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SHOW_DATE_VIEW:
      clone.showDateView = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default dates;

import { ADD_REPETITION } from "../actions/types/repetition";

// Start with the ID on 1 so that a regular user isn't confused if it says 0 in the UI
const initialState = {
  repetitions: [],
  currentRepetitionId: 1
};

function repetition(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case ADD_REPETITION:
      const dataWithId = {
        data: action.data
      };
      clone.repetitions.push(dataWithId);
      return clone;
    default:
      return clone;
  }
}

export default repetition;

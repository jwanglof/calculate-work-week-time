import { SET_WORKSPACE } from "../actions/types/workspace";

const initialState = {};

function workspace(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_WORKSPACE:
      const dataWithId = {
        data: action.data
      };
      clone.repetitions.push(dataWithId);
      return clone;
    default:
      return clone;
  }
}

export default workspace;

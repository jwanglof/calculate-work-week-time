import { SET_WORKSPACE_ID } from "../actions/types/workspace";

const initialState = {};

function workspace(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_WORKSPACE_ID:
      clone.workspaceId = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default workspace;

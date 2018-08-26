import {
  SET_WORKSPACE_ID,
  SET_WORKSPACES_FROM_TOGGL
} from "../actions/types/workspace";

const initialState = {};

function workspace(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_WORKSPACE_ID:
      clone.workspaceId = action.payload;
      return clone;
    case SET_WORKSPACES_FROM_TOGGL:
      clone.workspacesFromToggl = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default workspace;

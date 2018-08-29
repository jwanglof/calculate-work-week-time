import {
  FETCH_WORKSPACE_FAILED,
  FETCH_WORKSPACE_STARTED,
  SET_CURRENT_WORKSPACE,
  SET_WORKSPACES_FROM_TOGGL
} from "../actions/types/workspace";

const initialState = {
  workspacesFromToggl: [],
  currentWorkspace: {},
  isLoading: false,
  payload: null,
  error: null
};

function workspace(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_CURRENT_WORKSPACE:
      clone.currentWorkspace = action.payload;
      return clone;
    case SET_WORKSPACES_FROM_TOGGL:
      clone.workspacesFromToggl = action.payload;
      clone.isLoading = false;
      return clone;
    case FETCH_WORKSPACE_STARTED:
      clone.isLoading = true;
      return clone;
    case FETCH_WORKSPACE_FAILED:
      clone.isLoading = false;
      clone.error = action.error;
      return clone;
    default:
      return clone;
  }
}

export default workspace;

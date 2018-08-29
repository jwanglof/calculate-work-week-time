import {
  FETCH_WORKSPACE_FAILED,
  FETCH_WORKSPACE_SUCCESS,
  SET_WORKSPACE_ID,
  SET_WORKSPACES_FROM_TOGGL,
  FETCH_WORKSPACE_STARTED
} from "../actions/types/workspace";

const initialState = {
  workspaceId: "",
  workspacesFromToggl: [],
  isLoading: false,
  payload: null,
  error: null
};

function workspace(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_WORKSPACE_ID:
      clone.workspaceId = action.payload;
      return clone;
    case SET_WORKSPACES_FROM_TOGGL:
      clone.workspacesFromToggl = action.payload;
      return clone;
    case FETCH_WORKSPACE_STARTED:
      clone.isLoading = true;
      return clone;
    case FETCH_WORKSPACE_FAILED:
      clone.isLoading = false;
      clone.error = action.error;
      return clone;
    case FETCH_WORKSPACE_SUCCESS:
      clone.isLoading = false;
      clone.payload = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default workspace;

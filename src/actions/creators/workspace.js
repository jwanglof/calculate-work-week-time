import {
  FETCH_WORKSPACE_FAILED,
  FETCH_WORKSPACE_STARTED,
  FETCH_WORKSPACE_SUCCESS,
  SET_WORKSPACE_ID,
  SET_WORKSPACES_FROM_TOGGL
} from "../types/workspace";

export function setWorkspaceId(payload) {
  return { type: SET_WORKSPACE_ID, payload };
}

export function setWorkspacesFromToggl(payload) {
  return { type: SET_WORKSPACES_FROM_TOGGL, payload };
}

export function fetchWorkspaceStarted() {
  return { type: FETCH_WORKSPACE_STARTED };
}

export function fetchWorkspaceFailed(error) {
  return { type: FETCH_WORKSPACE_FAILED, error };
}

export function fetchWorkspaceSuccess(payload) {
  return { type: FETCH_WORKSPACE_SUCCESS, payload };
}

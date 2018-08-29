import {
  FETCH_WORKSPACE_FAILED,
  FETCH_WORKSPACE_STARTED,
  SET_CURRENT_WORKSPACE,
  SET_WORKSPACES_FROM_TOGGL
} from "../types/workspace";

export function setCurrentWorkspace(payload) {
  return { type: SET_CURRENT_WORKSPACE, payload };
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

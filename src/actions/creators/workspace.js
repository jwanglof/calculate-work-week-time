import {
  SET_WORKSPACE_ID,
  SET_WORKSPACES_FROM_TOGGL
} from "../types/workspace";

export function setWorkspaceId(payload) {
  return { type: SET_WORKSPACE_ID, payload };
}

export function setWorkspacesFromToggl(payload) {
  return { type: SET_WORKSPACES_FROM_TOGGL, payload };
}

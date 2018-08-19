import { SET_WORKSPACE_ID } from "../types/workspace";

export function setWorkspaceId(data) {
  return { type: SET_WORKSPACE_ID, data };
}

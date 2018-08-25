import { SET_WORKSPACE_ID } from "../types/workspace";

export function setWorkspaceId(payload) {
  return { type: SET_WORKSPACE_ID, payload };
}

import { SET_WORKSPACE } from "../types/workspace";

export function setWorkspace(data) {
  return { type: SET_WORKSPACE, data };
}

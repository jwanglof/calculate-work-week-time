import {
  FETCH_TIMES_FAILED,
  FETCH_TIMES_STARTED,
  FETCH_TIMES_SUCESS,
  FETCH_WORKSPACE_FAILED,
  FETCH_WORKSPACE_STARTED,
  FETCH_WORKSPACE_SUCCESS
} from "../types/toggl";

export function fetchTimesStarted() {
  return { type: FETCH_TIMES_STARTED };
}

export function fetchTimesFailed(error) {
  return { type: FETCH_TIMES_FAILED, error };
}

export function fetTimesSuccess(payload) {
  return { type: FETCH_TIMES_SUCESS, payload };
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

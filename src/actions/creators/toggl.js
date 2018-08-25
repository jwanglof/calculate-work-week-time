import {
  FETCH_TIMES_FAILED,
  FETCH_TIMES_STARTED,
  FETCH_TIMES_SUCESS
} from "../types/toggl";

export function fetchTimesStarted() {
  return { type: FETCH_TIMES_STARTED };
}

export function fetchTimesFailed() {
  return { type: FETCH_TIMES_FAILED };
}

export function fetTimesSuccess(payload) {
  return { type: FETCH_TIMES_SUCESS, payload };
}

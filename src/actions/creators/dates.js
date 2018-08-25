import { SET_END_DATE, SET_START_DATE, SET_WEEK_NUMBER } from "../types/dates";

export function setStartDate(payload) {
  return { type: SET_START_DATE, payload };
}

export function setEndDate(payload) {
  return { type: SET_END_DATE, payload };
}

export function setWeekNumber(payload) {
  return { type: SET_WEEK_NUMBER, payload };
}

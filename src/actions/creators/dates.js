import { SET_END_DATE, SET_START_DATE } from "../types/dates";

export function setStartDate(payload) {
  return { type: SET_START_DATE, payload };
}

export function setEndDate(payload) {
  return { type: SET_END_DATE, payload };
}

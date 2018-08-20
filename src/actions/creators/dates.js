import { SET_END_DATE, SET_START_DATE } from "../types/dates";

export function setStartDate(data) {
  return { type: SET_START_DATE, data };
}

export function setEndDate(data) {
  return { type: SET_END_DATE, data };
}

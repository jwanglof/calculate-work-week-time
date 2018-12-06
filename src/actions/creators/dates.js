import {
  SET_END_DATE,
  SET_START_DATE,
  SET_WEEK_NUMBER,
  SET_FROM_DATE,
  SET_TO_DATE,
  WEEK_SET_SELECTED_DAYS
} from "../types/dates";

export function setStartDate(payload) {
  return { type: SET_START_DATE, payload };
}

export function setEndDate(payload) {
  return { type: SET_END_DATE, payload };
}

export function setWeekNumber(payload) {
  return { type: SET_WEEK_NUMBER, payload };
}

export function setFromDate(payload) {
  return { type: SET_FROM_DATE, payload };
}

export function setToDate(payload) {
  return { type: SET_TO_DATE, payload };
}

export function weekSetSelectedDays(payload) {
  return { type: WEEK_SET_SELECTED_DAYS, payload };
}

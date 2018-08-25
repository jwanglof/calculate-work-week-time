import { SET_HOURS_IN_A_WEEK } from "../types/hoursInAWeek";

export function setHoursInAWeek(payload) {
  return { type: SET_HOURS_IN_A_WEEK, payload };
}

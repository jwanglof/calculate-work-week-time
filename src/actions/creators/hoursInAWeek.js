import { SET_HOURS_IN_A_WEEK } from "../types/hoursInAWeek";

export function setHoursInAWeek(data) {
  return { type: SET_HOURS_IN_A_WEEK, data };
}

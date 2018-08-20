import { combineReducers } from "redux";
import workspace from "./workspace";
import apiToken from "./apiToken";
import hoursInAWeek from "./hoursInAWeek";
import dates from "./dates";
import toggl from "./toggl";

const rootReducer = combineReducers({
  workspace,
  apiToken,
  hoursInAWeek,
  dates,
  toggl
});

export default rootReducer;

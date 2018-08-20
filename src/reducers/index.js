import { combineReducers } from "redux";
import workspace from "./workspace";
import apiToken from "./apiToken";
import hoursInAWeek from "./hoursInAWeek";
import dates from "./dates";

const rootReducer = combineReducers({
  workspace,
  apiToken,
  hoursInAWeek,
  dates
});

export default rootReducer;

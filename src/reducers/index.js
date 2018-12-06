import { combineReducers } from "redux";
import workspace from "./workspace";
import apiToken from "./apiToken";
import hoursInAWeek from "./hoursInAWeek";
import dates from "./dates";
import toggl from "./toggl";
import views from "./views";

const rootReducer = combineReducers({
  workspace,
  apiToken,
  hoursInAWeek,
  dates,
  toggl,
  views
});

export default rootReducer;

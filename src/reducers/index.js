import { combineReducers } from "redux";
import workspace from "./workspace";
import apiToken from "./apiToken";
import hoursInAWeek from "./hoursInAWeek";

const rootReducer = combineReducers({
  workspace,
  apiToken,
  hoursInAWeek
});

export default rootReducer;

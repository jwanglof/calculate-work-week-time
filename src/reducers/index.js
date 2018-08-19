import { combineReducers } from "redux";
import repetition from "./repetition";
import workspace from "./workspace";

const rootReducer = combineReducers({
  repetition,
  workspace
});

export default rootReducer;

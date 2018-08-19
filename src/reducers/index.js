import { combineReducers } from "redux";
import workspace from "./workspace";
import apiToken from "./apiToken";

const rootReducer = combineReducers({
  workspace,
  apiToken
});

export default rootReducer;

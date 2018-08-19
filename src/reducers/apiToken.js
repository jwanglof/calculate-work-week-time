import { SET_API_TOKEN } from "../actions/types/apiToken";

const initialState = {};

function apiToken(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case SET_API_TOKEN:
      clone.apiToken = action.data;
      return clone;
    default:
      return clone;
  }
}

export default apiToken;

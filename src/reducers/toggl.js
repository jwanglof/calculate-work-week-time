import {
  FETCH_TIMES_FAILED,
  FETCH_TIMES_STARTED,
  FETCH_TIMES_SUCESS,
  FETCH_WORKSPACE_FAILED,
  FETCH_WORKSPACE_STARTED,
  FETCH_WORKSPACE_SUCCESS
} from "../actions/types/toggl";

const initialState = {
  isLoading: false,
  payload: null,
  error: ""
};

function toggl(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case FETCH_TIMES_STARTED:
      clone.isLoading = true;
      return clone;
    case FETCH_TIMES_FAILED:
      clone.isLoading = false;
      clone.error = action.error;
      return clone;
    case FETCH_TIMES_SUCESS:
      clone.isLoading = false;
      clone.payload = action.payload;
      return clone;
    case FETCH_WORKSPACE_STARTED:
      clone.isLoading = true;
      return clone;
    case FETCH_WORKSPACE_FAILED:
      clone.isLoading = false;
      clone.error = action.error;
      return clone;
    case FETCH_WORKSPACE_SUCCESS:
      clone.isLoading = false;
      clone.payload = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default toggl;

import {
  FETCH_TIMES_FAILED,
  FETCH_TIMES_STARTED,
  FETCH_TIMES_SUCESS
} from "../actions/types/toggl";

const initialState = {
  isLoading: false,
  payload: null,
  errorMessage: ""
};

function toggl(state = initialState, action) {
  const clone = Object.assign({}, state);

  switch (action.type) {
    case FETCH_TIMES_STARTED:
      clone.isLoading = true;
      return clone;
    case FETCH_TIMES_FAILED:
      clone.isLoading = false;
      clone.errorMessage =
        "Something went wrong when fetching times from Toggl :(";
      return clone;
    case FETCH_TIMES_SUCESS:
      clone.isLoading = false;
      clone.payload = action.payload;
      return clone;
    default:
      return clone;
  }
}

export default toggl;

import { SET_API_TOKEN } from "../types/apiToken";

export function setApiToken(data) {
  return { type: SET_API_TOKEN, data };
}

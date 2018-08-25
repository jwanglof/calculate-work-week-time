import { SET_API_TOKEN } from "../types/apiToken";

export function setApiToken(payload) {
  return { type: SET_API_TOKEN, payload };
}

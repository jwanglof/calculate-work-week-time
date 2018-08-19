import { ADD_REPETITION } from "../types/repetition";

export function addRepetition(data) {
  return { type: ADD_REPETITION, data };
}

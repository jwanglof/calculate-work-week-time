import { SHOW_DATE_VIEW } from "../types/views";

export function setShowDateView(payload) {
  return { type: SHOW_DATE_VIEW, payload };
}

export function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionItem(key) {
  const value = sessionStorage.getItem(key);
  if (!value) {
    return value;
  }
  return JSON.parse(value);
}

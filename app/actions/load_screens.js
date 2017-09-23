export function loadStartScreen() {
  return {
    type: "LOAD_START_SCREEN"
  };
}

export function loadHomeScreen(user) {
  return {
    type: "LOAD_HOME",
    user
  };
}

export function logOut() {
  return {
    type: "LOG_OUT"
  };
}

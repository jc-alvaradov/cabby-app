export function setStart(pos) {
  return {
    type: "SET_RIDE_START",
    pos
  };
}

export function cleanStart() {
  return {
    type: "CLEAN_RIDE_START"
  };
}

export function setFinish(pos) {
  return {
    type: "SET_RIDE_FINISH",
    pos
  };
}

export function cleanFinish() {
  return {
    type: "CLEAN_RIDE_FINISH"
  };
}

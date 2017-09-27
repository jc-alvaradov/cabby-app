function setStart(pos) {
  return {
    type: "SET_RIDE_START",
    pos
  };
}

function setFinish(pos) {
  return {
    type: "SET_RIDE_FINISH",
    pos
  };
}

export { setStart, setFinish };

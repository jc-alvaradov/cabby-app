export default function rideFinishReducer(state = null, action) {
  switch (action.type) {
    case "SET_RIDE_FINISH":
      return action.pos;
    case "CLEAN_RIDE_FINISH":
      return null;
    default:
      return state;
  }
}

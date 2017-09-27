export default function rideStartReducer(state = null, action) {
  switch (action.type) {
    case "SET_RIDE_START":
      return action.pos;
    case "CLEAN_RIDE_START":
      return null;
    default:
      return state;
  }
}

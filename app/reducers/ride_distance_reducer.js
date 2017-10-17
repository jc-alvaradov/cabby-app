export default function rideDistanceReducer(state = 0, action) {
  switch (action.type) {
    case "SAVE_RIDE_DISTANCE":
      return action.distance;
    default:
      return state;
  }
}

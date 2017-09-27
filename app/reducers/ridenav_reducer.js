export default function ridenavReducer(state = "hidden", action) {
  switch (action.type) {
    case "RIDE_NAV":
      return action.screen;
    default:
      return state;
  }
}

const initialState = {
  latitude: 0,
  longitude: 0
};

export default function rideFinish(state = initialState, action) {
  switch (action.type) {
    case "SET_RIDE_FINISH":
      return action.pos;
    default:
      return state;
  }
}

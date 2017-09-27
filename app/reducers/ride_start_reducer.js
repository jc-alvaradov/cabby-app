const initialState = {
  latitude: 0,
  longitude: 0
};

export default function rideStart(state = initialState, action) {
  switch (action.type) {
    case "SET_RIDE_START":
      return action.pos;
    default:
      return state;
  }
}

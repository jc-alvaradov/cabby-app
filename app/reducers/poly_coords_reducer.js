export default function polyCoordsReducer(state = null, action) {
  switch (action.type) {
    case "SET_POLY_COORDS":
      return action.polyCoords;
    case "CLEAN_POLY_COORDS":
      return null;
    default:
      return state;
  }
}

export default function destinoReducer(state = "", action) {
  switch (action.type) {
    case "TERMINAR_CIUDAD":
      return action.payload;
    default:
      return state;
  }
}

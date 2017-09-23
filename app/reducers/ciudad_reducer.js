export default function ciudadReducer(state = "", action) {
  switch (action.type) {
    case "CAMBIAR_CIUDAD":
      return action.payload;
    default:
      return state;
  }
}

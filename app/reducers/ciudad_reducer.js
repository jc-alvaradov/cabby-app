export default function(state = "", action) {
  switch (action.type) {
    case "CAMBIAR_CIUDAD":
      return action.payload;
    default:
      return state;
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case "TERMINAR_CIUDAD":
      return Object.assign({}, { destino: action.payload });
    default:
      return state;
  }
}

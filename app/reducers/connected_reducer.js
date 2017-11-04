export default function connectedReducer(state = true, action) {
  switch (action.type) {
    case "CONNECTION_STATE":
      return action.state;
    default:
      return state;
  }
}

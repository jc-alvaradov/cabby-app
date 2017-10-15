export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "SAVE_DRIVER":
      return action.driver;
    default:
      return state;
  }
}

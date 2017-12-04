export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "LOAD_HOME":
      return action.user;
    case "EDIT_USER":
      return action.user;
    default:
      return state;
  }
}

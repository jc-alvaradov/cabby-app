export default function iconsReducer(state = true, action) {
  switch (action.type) {
    case "SHOW_ICONS":
      return action.show;
    default:
      return state;
  }
}

import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../navigators/AppNavigator";

const initialNavState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Loader")
);

export default function navReducer(state = initialNavState, action) {
  let nextState;

  switch (action.type) {
    case "LOAD_START_SCREEN":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Login" })]
        }),
        state
      );
      break;
    case "LOAD_HOME":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        }),
        state
      );
      break;
    case "LOG_OUT":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: "Login" })]
        }),
        state
      );
      break;
    case "NAV":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: state.route
        }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}

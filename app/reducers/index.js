import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import ciudadReducer from "./ciudad_reducer";
import destinoReducer from "./destino_reducer";
import loggedReducer from "./logged_reducer";
import iconsReducer from "./icons_reducer";
import ridenavReducer from "./ridenav_reducer";
import rideStartReducer from "./ride_start_reducer";
import rideFinishReducer from "./ride_finish_reducer";
import navReducer from "./nav_reducer";

export default combineReducers({
  ciudad: ciudadReducer,
  destino: destinoReducer,
  loggedIn: loggedReducer,
  showIcons: iconsReducer,
  rideNav: ridenavReducer,
  rideStart: rideStartReducer,
  rideFinish: rideFinishReducer,
  user: userReducer,
  nav: navReducer
});

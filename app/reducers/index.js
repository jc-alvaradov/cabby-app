import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import driverReducer from "./driver_reducer";
import ciudadReducer from "./ciudad_reducer";
import destinoReducer from "./destino_reducer";
import iconsReducer from "./icons_reducer";
import ridenavReducer from "./ridenav_reducer";
import rideStartReducer from "./ride_start_reducer";
import rideFinishReducer from "./ride_finish_reducer";
import rideDistanceReducer from "./ride_distance_reducer";
import polyCoordsReducer from "./poly_coords_reducer";
import navReducer from "./nav_reducer";

export default combineReducers({
  ciudad: ciudadReducer,
  destino: destinoReducer,
  showIcons: iconsReducer,
  rideNav: ridenavReducer,
  rideStart: rideStartReducer,
  rideFinish: rideFinishReducer,
  polyCoords: polyCoordsReducer,
  user: userReducer,
  driver: driverReducer,
  distance: rideDistanceReducer,
  nav: navReducer
});

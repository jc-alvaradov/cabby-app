import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import ciudadReducer from "./ciudad_reducer";
import destinoReducer from "./destino_reducer";
import loggedReducer from "./logged_reducer";
import navReducer from "./nav_reducer";

export default combineReducers({
  ciudad: ciudadReducer,
  destino: destinoReducer,
  loggedIn: loggedReducer,
  user: userReducer,
  nav: navReducer
});

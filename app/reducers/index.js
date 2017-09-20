import { combineReducers } from "redux";
import ciudadReducer from "./ciudad_reducer";
import destinoReducer from "./destino_reducer";

export default combineReducers({
  ciudad: ciudadReducer,
  destino: destinoReducer
});

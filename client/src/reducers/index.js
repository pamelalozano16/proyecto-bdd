import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import search from "./search";
import tableros from "./tableros";

export default combineReducers({
  alert,
  auth,
  search,
  tableros,
});

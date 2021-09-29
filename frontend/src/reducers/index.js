import { combineReducers } from "redux";
import grocerybag from "./grocerybag/grocerybag";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  grocerybag,
  errors,
  messages,
  auth,
});

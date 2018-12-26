import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  profileReducer,
  postReducer
});

export default rootReducer;

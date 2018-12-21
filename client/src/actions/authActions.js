import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//importing Types
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User
export const registerUserAction = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login -- GET User Token
export const loginUserAction = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth Header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUserAction(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Log User In
export const setCurrentUserAction = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log User Out
export const logoutUserAction = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove Auth header from future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUserAction({}));
};

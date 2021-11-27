import { loginFailure, loginStart, loginSuccess,logout } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    // const {cart,...userData}=res.data;
    // console.log(cart);
    // dispatch(loginSuccess(userData));
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const Logout = async (dispatch) => {
    try {
    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
};
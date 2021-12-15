import {loginFailure, loginStart, loginSuccess} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
    const data = await res.json()
    dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

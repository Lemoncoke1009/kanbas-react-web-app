import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kanbas/Account/Profile");
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input id="wd-username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-2" placeholder="username" />
      <input id="wd-password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
        className="form-control mb-2" placeholder="password" />
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
      <Link className="wd-signin-link" to="/Kanbas/Account/Signin">Sign in</Link>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input id="wd-username" placeholder="username" className="form-control mb-2"
        defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      <input id="wd-password" placeholder="password" type="password" className="form-control mb-2"
        defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup"> Sign up </Link>
    </div>
  );
}
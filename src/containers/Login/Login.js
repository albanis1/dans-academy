import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [mask, setMask] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const maskPassword = () => {
    setMask(!mask);
  };

  const login = () => {
    if (isEmpty(email) || isEmpty(password)) {
      alert("Password / Email Tidak Boleh Kosong");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="login-form">
      <form>
        <header>
          <div className="user-info">
            <h3>DAns Academy</h3>
            <h5>
              <i>Perfectly Done by DAns</i>
            </h5>
          </div>
        </header>
        <section>
          <div className="input">
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <input
              className="toggle-type"
              type={mask ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={maskPassword}>
              {mask ? "Mask Password" : "Show Password"}
            </span>
          </div>
          <div className="confirm-password">
            <div className="inner">
              <input type="password" placeholder="Confirm Password" />
            </div>
          </div>
        </section>
        <footer>
          <div className="login-help">
            <h5>
              <span>Forgot login info?</span>
            </h5>
          </div>
          <div className="action">
            <span onClick={login}>Login</span>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Login;

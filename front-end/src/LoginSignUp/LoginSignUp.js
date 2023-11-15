import React, { useState } from "react";
import "./LoginSignUp.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

function LoginSignUp() {
  const [action, setAction] = useState("Sign Up");
  const initialFormState = {
    name: "",
    user_name: "",
    password: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  }

  return (
    <body>
      <div className="box">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Log In" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={user_icon} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
          )}
          <div className="input">
            <img src={email_icon} />
            <input
              type="email"
              name="user_name"
              id="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Email Id"
            />
          </div>
          <div className="input">
            <img src={password_icon} />
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>
        {action === "Log In" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot password? <span>Click Here!</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Log In" ? "submit gray" : "submit"}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => setAction("Log In")}
          >
            Login
          </div>
        </div>
      </div>
    </body>
  );
}

export default LoginSignUp;

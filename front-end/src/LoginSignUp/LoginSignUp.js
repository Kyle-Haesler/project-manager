import React, { useState } from "react";
import "./LoginSignUp.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { createUser, loginUser } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { useUser } from "../userContext/userContext";

function LoginSignUp() {
  const [action, setAction] = useState("Sign Up");
  const { login } = useUser();
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const initialFormState = {
    name: "",
    user_name: "",
    password: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (action === "Sign Up") {
      const abortController = new AbortController();
      setSignUpError("");
      try {
        const data = await createUser(formData, abortController.signal);
        setFormData({ ...initialFormState });
        login(data.user_name);
        history.push("/");
      } catch (error) {
        setSignUpError(error);
        console.log(signUpError);
      }
      return () => abortController.abort();
    } else {
      const abortController = new AbortController();
      try {
        const data = await loginUser(
          formData.user_name,
          formData.password,
          abortController.signal
        );

        setFormData({ ...initialFormState });
        login(data.user_name);
        history.push("/");
      } catch (error) {
        setSignInError(error);
      }
      return () => abortController.abort();
    }
  }
  // Handling of state toggling between sign up and login
  // handle switch from log in to sign up
  function handleLoginToSignUpToggle() {
    setSignInError("");
    setSignUpError("");
    setFormData({ ...initialFormState });
    setAction("Sign Up");
  }
  // handle switch from sign up to log in
  function handleSignUpToLoginToggle() {
    setSignInError("");
    setSignUpError("");
    setFormData({ ...initialFormState });
    setAction("Log In");
  }

  return (
    <body>
      <div className="box">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
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
                  required
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
                required
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
                required
              />
            </div>
            {signInError || signUpError ? (
              <div className="input error-box">
                <ErrorAlert error={signUpError} />
                <ErrorAlert error={signInError} />
              </div>
            ) : (
              <div></div>
            )}

            <div className="submit-container">
              <button type="submit" className="submit black">
                Submit
              </button>
            </div>
          </div>
        </form>
        {action === "Log In" ? (
          <div className="forgot-password">
            Need to sign up?{" "}
            <span onClick={handleLoginToSignUpToggle}>Click Here!</span>
          </div>
        ) : (
          <div className="forgot-password">
            Already have an account?{" "}
            <span onClick={handleSignUpToLoginToggle}>Click Here!</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Log In" ? "submit gray" : "submit"}
            onClick={handleLoginToSignUpToggle}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={handleSignUpToLoginToggle}
          >
            Login
          </div>
        </div>
      </div>
    </body>
  );
}

export default LoginSignUp;

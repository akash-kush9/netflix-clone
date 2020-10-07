import React from "react";
import "./Login.css";
const Login = () => {
  const handleGoogleAuthentication = () => {};

  return (
    <div className="login">
      <div className="login__top">
        <img src="https://i.pinimg.com/originals/17/65/2c/17652c3268c85ac2e3ac9fbdab374a5a.png" />{" "}
      </div>
      <div className="login__center">
        <div className="login__container">
          <h1> Sign In</h1>
          <form>
            <p>Email or phone number</p>
            <input type="string" />
            <p>Password</p>
            <input type="password" />
            <button>Sign In</button>
            <div className="login__signOptions">
              <div className="login__optionLeft">
                <input type="checkbox" /> <p>Remember Me </p>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
        </div>
        <div className="login__bottom">
          {" "}
          <h5>Login with Facebook</h5>
          <h3>
            New to Netflix?{" "}
            <span onClick={() => handleGoogleAuthentication}>
              {" "}
              Sign up with Google.{" "}
            </span>{" "}
          </h3>
          <p>
            This page is proptected by Google reCaptacha to ensure you're not a
            not.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

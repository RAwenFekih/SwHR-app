import React from "react";
import "./Auth.css";
import SignInForm from "./SignIn";
import signIn_logo from "../../assets/signIn1.png";

export default function Auth({ setUser }) {
  return (
    <div className="Auth">
      <div className="container1" id="container1">
        <SignInForm setUser={setUser} /> {}
        <div className="overlay-container1">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <img src={signIn_logo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

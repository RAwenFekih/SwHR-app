import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await fetch("http://localhost:8081/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //setUser(data.user);
        console.log("Login success:", data);

        navigate("/dashboard");
      } else {
        console.error("Login failed:", data);
        alert(data.error || "Login failed");
        return;
      }
      // Save user info, navigate, etc.
    } catch (err) {
      console.error("Server error:", err);
      alert("Server is not responding");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <img
          src={logo}
          alt=""
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        ></img>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder=" Type your Email "
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder=" Type your Password"
          value={state.password}
          onChange={handleChange}
        />
        <Link to="/password-reset" className="forgot-password-link">
          Forgot your password?
        </Link>
        <button className="ghost1">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/authContext";
import "./login.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [uError, setuError] = useState();
  const [pError, setPerror] = useState();

  // Move the navigate hook outside the handleSubmit function
  const navigate = useNavigate();

  // Move the useContext and useState hooks outside the handleSubmit function
  const { login } = useContext(AuthContext);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(inputs);
      

     

      // Check if the login was successful
      if (localStorage.getItem("user")) {
        console.log("Login successful!");
        navigate("/home");
      } else {
        console.log("Login failed. Invalid credentials.");
        setErr("Invalid credentials.");
      }
    } catch (err) {
      console.log(
        "Login failed. Error:",
        err.response?.data?.message || "An error occurred"
      );
      setErr(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <form action="" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="label">
          <label htmlFor="username">
            username <span className="required">*</span>
          </label>
          <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
          <p style={{ color: "red" }}>{uError}</p>
          <label htmlFor="password">
            password<span className="required">*</span>
          </label>
          <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
          <p style={{ color: "red" }}>{pError}</p>
        </div>
        <p>Make sure it's at least 8 characters including a number and a lowercase letter.</p>
        <button>Login</button>
        <h6>
          Have no account account Yet?<Link to="/signup">Register</Link>{" "}
        </h6>
      </form>
    </div>
  );
};

export default Login;

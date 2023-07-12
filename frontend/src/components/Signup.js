import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Signup() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [username, setusername] = useState("");
  const [email_adress, setemail_adress] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here

    const values = {
      first_name,
      last_name,
      username,
      email_adress,
      password,
      confirm_password,
    };

    if (password !== confirm_password) {
      alert("Passsword do not match");
    } else {
      axios.post("http://localhost:4000/register", values).then((res) => {
        navigate("/login");
      });
    }
  };

  return (
    <div className="form-container">
      <form action="" onSubmit={handleSubmit}>
        <h2>Join Connect App Today!</h2>

        <div className="label">
          <label htmlFor="first_name">
            First Name<span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="John"
            value={first_name}
            required
            onChange={(e) => setfirst_name(e.target.value)}
          />

          <div className="label">
            <label htmlFor="last_name">
              Last Name<span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Makau"
              value={last_name}
              required
              onChange={(e) => setlast_name(e.target.value)}
            />

            <label htmlFor="username">
              username<span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="JohnM"
              value={username}
              required
              onChange={(e) => setusername(e.target.value)}
            />

            <label htmlFor="email_adress">
              Email Adress<span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="abc@gmail.com"
              value={email_adress}
              required
              onChange={(e) => setemail_adress(e.target.value)}
            />

            <label htmlFor="password">
              Password<span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              required
              onChange={(e) => setpassword(e.target.value)}
            />

            <label htmlFor="c_password">
              confirm password<span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="********"
              value={confirm_password}
              required
              onChange={(e) => setconfirm_password(e.target.value)}
            />
          </div>
          <p>
            Make sure it's at least 8 characters including a number and a
            lowercase letter. <a href="#">Learn more.</a>
          </p>

          <button>Register</button>
          <p>
            By creating an account you agree to the{" "}
            <a href="#">Terms of Service</a>. For more information about Library
            privacy practices, see the <a href="#">Library Privacy Statement</a>
            .Connect wit friends and enjoy
          </p>
        </div>
        <h6>
          Already registered to our Library? <Link to="/login">Login</Link>
        </h6>
      </form>
    </div>
  );
}

export default Signup;

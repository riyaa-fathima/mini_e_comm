import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;
  console.log(baseURL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post(`${baseURL}/users/login`, {
          email: formData.email,
          password: formData.password,
        });
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setMessage(`"welcome back"${res.data.name}!`);
        if (res.data.isAdmin) {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        if (formData.password != formData.confirmPassword) {
          setMessage("password do not match");
          setLoading(false);
          return;
        }
        const res = await axios.post(`${baseURL}/users/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        setMessage("sign up successfully Rediricting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 "
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgb(0,0,0,0.1)",
        }}
      >
        <h4 className="text-center fw-bold mb-3">
          {isLogin ? "Welcome back" : "Create an Account"}
        </h4>
        <p className="text-center text-muted">
          {isLogin ? "Login to your account" : "Sign up to get started"}
        </p>
        {message && <div className="alert p-2 text-center">{message}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Full Name"
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email-Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Confirm password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={handleChange}
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                />
                <label htmlFor="remember" className="form-check-label">
                  {" "}
                  Remember
                </label>
              </div>
              <a href="#" className="small text-decoration-none">
                Forget Password?
              </a>
            </div>
          )}

          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

          <p className=" text-center mb-0">
            {isLogin ? "Dont have an account?" : "Already have an account"}{" "}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={toggleForm}
            >
              {!isLogin ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

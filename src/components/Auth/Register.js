import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import "./Register.scss";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("inval email");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("inval password");
      return;
    }

    if (!username || username.length < 6) {
      toast.error("inval password");
      return;
    }
    const data = await postRegister(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
      <div className="content col-4">
        <div className="title ">Typeform</div>
        <div className="welcome ">Start your journey?</div>
        <div className="content-form  ">
          <div className="form-group">
            <label>Email (*)</label>
            <input
              type="text"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password (*) </label>
            <div className="form-group-password">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <p className="icon-eye" onClick={() => setShowPassword(false)}>
                  <FaRegEye />
                </p>
              ) : (
                <p className="icon-eye" onClick={() => setShowPassword(true)}>
                  <FaRegEyeSlash />
                </p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button className="btn-register" onClick={() => handleLogin()}>
              Create my free account
            </button>
          </div>
          <div className="text-center" onClick={() => navigate("/")}>
            <span className="back">&#60; &#60;Go Back HomePage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

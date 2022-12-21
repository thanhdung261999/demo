import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./Login.scss";
import { doLogin } from "../../redux/actions/userAction";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (!password) {
      toast.error("inval password");
      return;
    }

    setIsLoading(true);
    const data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign up</button>
      </div>
      <div className="content col-4">
        <div className="title ">Typeform</div>
        <div className="welcome ">Hello, who's this</div>
        <div className="content-form  ">
          <div className="form-group">
            <label>Email</label>
            <input
              value={email}
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={password}
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span className="forgot-password">Forgot password?</span>
          <div>
            <button
              className="btn-submit"
              disabled={isLoading}
              onClick={() => handleLogin()}
            >
              {isLoading === true && (
                <AiOutlineLoading3Quarters className="loading-icon" />
              )}
              Log in
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

export default Login;

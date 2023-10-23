import React, { useEffect } from "react";
import styles from "./Login.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { SvgIcon } from "@mui/material";
import googleLogo from "../../assets/icons8-google.svg";
// import facebookLogo from "../../assets/icons8-facebook.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, googleLogin, user, forgotPassword } = UserAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/home");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/home");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await googleLogin();
      navigate("/home");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      alert("Password reset link sent to your email");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    // Login form
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.header}>
          <div className={styles.text}>Login</div>
          {/* <div className={styles.underline}></div> */}
        </div>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <EmailIcon className={styles.icon} />
            <input
              type="email"
              name="mail"
              placeholder="Email Id"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className={styles.input}>
            <LockIcon className={styles.icon} />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#" onClick={handleForgotPassword}>
            Forgot Password?{" "}
          </a>
        </div>
        <div className={styles.submit}>
          <button className={styles.btn} type="submit">
            Login
          </button>
        </div>
        <div className={styles.signup}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
        <div className={styles.border}>
          <div className={styles.line}></div>
          <span>Or</span>
        </div>

        <div className={styles.mediaOptions}>
          <div className={styles.google}>
            <span>
              <img src={googleLogo} alt=""></img>
            </span>
            <a href="" onClick={handleGoogleSignIn}>
              <span>Login with Google</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

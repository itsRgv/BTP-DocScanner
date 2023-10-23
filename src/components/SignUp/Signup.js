import React, { useEffect } from "react";
import styles from "./signup.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  const validPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    if (email.length === 0 && emailFocus) {
      setErrorEmail("Email can't be empty");
    } else if (!email.match(validEmailRegex) && emailFocus) {
      setErrorEmail("Please enter a valid email address");
    } else {
      setErrorEmail("");
    }
  }, [email]);

  useEffect(() => {
    if (password.length === 0 && passwordFocus) {
      setErrorPassword("Password can't be empty");
    } else if (!password.match(validPasswordRegex) && passwordFocus) {
      setErrorPassword(
        "Password must contain atleast 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else {
      setErrorPassword("");
    }
  }, [password]);

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/home");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  return (
    // Signup form
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.header}>
          <div className={styles.text}>Sign up</div>
        </div>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            ></input>
          </div>
          <div className={styles.input}>
            <EmailIcon className={styles.icon} />
            <input
              type="email"
              name="mail"
              placeholder="Email Id"
              required
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => setEmailFocus(true)}
            ></input>
          </div>
          <div className={styles.errorMessageBox}>
            <p className={styles.errorText}>{errorEmail}</p>
          </div>
          <div className={styles.input}>
            <LockIcon className={styles.icon} />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setPasswordFocus(true)}
            ></input>
            <span
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          <div className={styles.errorMessageBox}>
            <p className={styles.errorText}>{errorPassword}</p>
          </div>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#">Forgot Password? </a>
        </div>
        <div className={styles.submit}>
          <button className={styles.btn}>Sign up</button>
        </div>
        <div className={styles.signup}>
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

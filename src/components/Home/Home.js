import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showResult, setShowResult] = useState(false);
  const handleClick = () => {
    setShowResult(!showResult);
  };
  const uploadFile = (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (file) {
      let data = new FormData();
      data.append("file", file[0]);
    }
  };

  const { logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        <label for="images" className={styles.dropContainer} id="dropcontainer">
          <span className={styles.dropTitle}>Drop file here</span>
          or
          <input
            type="file"
            id="images"
            accept="txt/*"
            name="myFile"
            onChange={(e) => uploadFile(e)}
            required
          />
        </label>
        {/* <input type="file" name="myFile" onChange={(e) => uploadFile(e)} /> */}

        <label for="images" className={styles.dropContainer} id="dropcontainer">
          <span className={styles.dropTitle}>Drop file here</span>
          or
          <input
            type="file"
            id="images"
            accept="txt/*"
            name="myFile"
            onChange={(e) => uploadFile(e)}
            required
          />
        </label>
      </div>
      <button type="submit" onClick={handleClick}>
        Match
      </button>

      {showResult && (
        <div className={styles.result}>
          <h1>Matched Successfully!</h1>

          <h2>Match Percentage: x%</h2>
        </div>
      )}

      <div className={styles.logout}>
        <a href="/" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Home;

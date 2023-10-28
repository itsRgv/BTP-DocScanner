import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MD5 from "../../backend/MD5";
import axios from "axios";

const Home = () => {
  const [showResult, setShowResult] = useState(false);
  const [files, setFiles] = useState([]);
  const [textArray, setTextArray] = useState([]); // [text1, text2, text3
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState("");
  const handleClick = () => {
    setShowResult(!showResult);
  };

  const handleUpload = () => {
    if (files.length) {
      const data = new FormData();
      [...files].map((file, i) => {
        data.append(`file-${i}`, file, file.name);
      });
      setMsg("Uploading...");
      setProgress((prevState) => ({ ...prevState, started: true }));
      axios
        .post("http://localhost:5000/home/post", data, {
          onUploadProgress: (ProgressEvent) => {
            setProgress((prevState) => ({
              ...prevState,
              pc: ProgressEvent.progress * 100,
            }));
          },
          headers: {
            "customed-header": "value",
          },
        })
        .then((res) => {
          setMsg("Uploaded Successfully!");
          console.log(res.data);
        })
        .catch((err) => {
          setMsg("Failed to upload");
          console.log(err);
        });
    } else {
      console.log("No files selected");
      return;
    }
  };

  const handleMatch = () => {
    console.log(files);
    if (files.length) {
      [...files].map((file) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          const text = reader.result;
          // console.log(text);
          setTextArray([...textArray, text]);
          // const hash = MD5(text);
          // console.log(hash);
        };
      });
      console.log(textArray);
      // MD5(textArray);
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
        <label className={styles.dropContainer} id="dropcontainer">
          <span className={styles.dropTitle}>Drop file here</span>
          or
          <input
            type="file"
            accept="txt/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            required
          />
        </label>
      </div>
      <button onClick={handleUpload}>Upload</button>
      {progress.started && <progress value={progress.pc} max="100" />}
      {msg && <span>{msg}</span>}
      <button type="submit" onClick={handleMatch}>
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

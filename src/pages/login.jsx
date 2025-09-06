import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/fireapp";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";   
import styles from "./Signup.module.css"; 

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const SignHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!Email || !Password) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      let Validator = await signInWithEmailAndPassword(auth, Email, Password);
      let UID = Validator.user.uid;

      localStorage.setItem("userUID", UID);

      if (UID) {
        navigate("/");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  
  useEffect(() => {
    const glow = document.querySelector(`.${styles.cursorGlow}`);
    const moveGlow = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  return (
    <div className={styles.signupWrapper}>
      
      <div className={styles.cursorGlow}></div>

    
      <motion.form
        onSubmit={SignHandler}
        className={styles.signupBox}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: " 0 0 40px rgba(255, 215, 0, 0.4)" }}
        whileTap={{ scale: 0.97 }}
      >
        <h2 className={styles.title}>Welcome Back 🔑</h2>

        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
          className={styles.input}
        />

        <button type="submit" className={styles.btn}>
          Login 
        </button>

        <p className={styles.loginText}>
          New here? <Link to="/singup">Signup</Link>
        </p>

        {Error && <p className={styles.error}>{Error}</p>}
      </motion.form>
    </div>
  );
};

export default Login;

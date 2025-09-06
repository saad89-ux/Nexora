import React, { useState, useEffect } from "react";
import { auth, db } from "../Firebase/fireapp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";   
import styles from "./Signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const SignupHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!Email || !userpassword) {
      setError("Email and password are required");
      return;
    }
    if (userpassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      let response = await createUserWithEmailAndPassword(auth, Email, userpassword);
      const UID = response.user.uid;
      localStorage.setItem("userUID", UID);

      let userobj = {
        username,
        email: Email,
        password: userpassword,
        phone: phonenumber,
        uid: UID,
        Timestamp: new Date(),
      };

      await setDoc(doc(db, "users", UID), userobj);

      setSuccess(`User created: ${response.user.email}`);
      setUsername("");
      setEmail("");
      setPassword("");
      setPhonenumber("");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
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
        onSubmit={SignupHandler}
        className={styles.signupBox}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(229, 255, 0, 0.77)" }} 
        whileTap={{ scale: 0.97 }}
      >
        <h2 className={styles.title}>Create Account ✨</h2>

        <input
          type="text"
          placeholder="Enter Your Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Enter Your Phone Number"
          onChange={(e) => setPhonenumber(e.target.value)}
          value={phonenumber}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={userpassword}
          className={styles.input}
        />

        <button type="submit" className={styles.btn}>
          Signup 
        </button>

        <p className={styles.loginText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </motion.form>
    </div>
  );
};

export default Signup;

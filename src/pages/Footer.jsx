import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
     
      <div className={styles.column}>
        <h2 className={styles.logo}>
          Nexora<span className={styles.logoColored}>Mart</span>
        </h2>
        <p className={styles.description}>
          Your trusted destination for groceries, electronics, and daily needs.
          Fast delivery. Best prices. Always reliable.
        </p>
      </div>

      
      <div className={styles.column}>
        <h3 className={styles.heading}>Quick Links</h3>
        <ul className={styles.list}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/profile">My Profile</NavLink></li>
        </ul>
      </div>

      
      <div className={styles.column}>
        <h3 className={styles.heading}>Categories</h3>
        <ul className={styles.list}>
          <li>Groceries</li>
          <li>Electronics</li>
          <li>Health & Beauty</li>
          <li>Home Essentials</li>
          <li>Sports</li>
        </ul>
      </div>

      
      <div className={styles.column}>
        <h3 className={styles.heading}>Contact</h3>
        <ul className={styles.list}>
          <li>Email: support@nexoramart.com</li>
          <li>Phone: +92 333 1234567</li>
          <li>Karachi, Pakistan</li>
        </ul>
      </div>

      
      <div className={styles.socialRow}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>

      
      <div className={styles.copy}>
        © {new Date().getFullYear()} NexoraMart. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

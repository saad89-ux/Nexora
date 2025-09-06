import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import "./navbar.style.css";

const Navbar = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const links = navRef.current.querySelectorAll(".nav-link");
    links.forEach((link) => {
      const underline = link.querySelector(".underline");
      link.addEventListener("mouseenter", () => {
        gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });
      });
    });
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <div className="logo-wrapper">
          <img
            src="/images/Generated Image September 06, 2025 - 1_14AM.jpeg"
            alt="Nexora Logo"
            className="logo-img"
          />
        </div>

        
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

       
        <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
          <li className="nav-item">
            <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home <span className="underline"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
              About <span className="underline"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
              Contact <span className="underline"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
              My Profile <span className="underline"></span>
            </NavLink>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;


import React, { useState, useEffect } from "react";
import styles from "./contact.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase/fireapp";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [alreadySent, setAlreadySent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  
  const checkUserMessage = async (email) => {
    if (!email) return;
    const q = query(collection(db, "ContactMessages"), where("email", "==", email));
    const snapshot = await getDocs(q);
    setAlreadySent(!snapshot.empty);
  };


  useEffect(() => {
    if (auth.currentUser) {
      const email = auth.currentUser.email;
      setUserEmail(email);
      checkUserMessage(email);
    }
  }, [auth.currentUser]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      showToast("You must be logged in to send a message.", "error");
      return;
    }
    if (alreadySent) {
      showToast("You have already sent a message with this email.", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await addDoc(collection(db, "ContactMessages"), {
        ...data,
        email: auth.currentUser.email, 
        Timestamp: new Date(),
      });
      showToast("Message sent successfully!", "success");
      setAlreadySent(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      showToast("Failed to send message!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      
      {toast.show && (
        <div className={`${styles.toast} ${toast.type === "error" ? styles.error : styles.success}`}>
          {toast.message}
        </div>
      )}

      <div className={styles.contactWrapper}>
        
        <div className={styles.formContainer}>
          <h2 className={styles.heading}>Get in Touch</h2>
          <p className={styles.subheading}>We would love to hear from you!</p>

          {alreadySent ? (
            <p className={styles.alreadyMsg}>
              ✅ You’ve already sent a message with <b>{userEmail}</b>.  
              We’ll get back to you soon.
            </p>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="tel" name="phone" placeholder="Your Phone Number" required />
              <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

       
        <div className={styles.mapSection}>
          <h2 className={styles.heading}>Where You Can Find Us</h2>
          <MapContainer
            center={[24.8607, 67.0011]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[24.8607, 67.0011]}>
              <Popup>Nexora Office</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;

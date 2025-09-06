import React, { useState, useEffect } from "react";
import styles from "./contact.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase/fireapp";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [userEmail, setUserEmail] = useState("");
  const [messageCount, setMessageCount] = useState(0); 

  
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  
  useEffect(() => {
    const checkUserMessages = async () => {
      if (auth.currentUser) {
        const email = auth.currentUser.email;
        setUserEmail(email);

        const q = query(collection(db, "ContactMessages"), where("email", "==", email));
        const snapshot = await getDocs(q);

        setMessageCount(snapshot.size); 
      }
    };

    checkUserMessages();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (messageCount >= 5) {
      showToast("⚠️ You have reached the limit of 5 messages with this email.", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await addDoc(collection(db, "ContactMessages"), {
        ...data,
        email: userEmail, 
        Timestamp: new Date(),
      });

      showToast("✅ Message sent successfully!", "success");
      setMessageCount((prev) => prev + 1); 
      e.target.reset();
    } catch (error) {
      console.error(error);
      showToast("❌ Failed to send message!", "error");
    }

    setLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      {/* Toast notification */}
      {toast.show && (
        <div className={`${styles.toast} ${toast.type === "error" ? styles.error : styles.success}`}>
          {toast.message}
        </div>
      )}

      <div className={styles.contactWrapper}>
       
        <div className={styles.formContainer}>
          <h2 className={styles.heading}>Get in Touch</h2>
          <p className={styles.subheading}>We would love to hear from you!</p>

          {messageCount >= 5 ? (
            <p className={styles.alreadyMsg}>
              🚫 You’ve reached the maximum of <b>5 messages</b> with <b>{userEmail}</b>.
              Please wait for our response.
            </p>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="tel" name="phone" placeholder="Your Phone Number" required />
              <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : `Send Message (${5 - messageCount} left)`}
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

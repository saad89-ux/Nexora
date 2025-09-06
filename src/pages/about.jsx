import React from "react";
import styles from "./About.module.css";
import { FaShoppingCart, FaUsers, FaGlobe, FaMedal, FaRocket } from "react-icons/fa";


const partners = [
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", link: "https://amazon.com", isText: false },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", link: "https://google.com", isText: false },
  { name: "Microsoft", link: "https://microsoft.com", isText: true },
  { name: "ChatGPT", link: "https://chat.openai.com/", isText: true },
  { name: "HackTheBox", link: "https://www.hackthebox.com/", isText: true },
];

const users = [
  { name: "Talha", review: "Nexora makes online shopping effortless!" },
  { name: "David Crewell", review: "Fast delivery and amazing products." },
  { name: "Haseeb", review: "I love the user-friendly interface." },
  { name: " Ayesha", review: "Reliable and affordable." },
  { name: "Jaffar", review: "Great customer service and quality products." },
];

const companyHistory = [
  { year: "2015", event: "Nexora was founded to simplify online shopping.", icon: <FaShoppingCart /> },
  { year: "2016", event: "Partnered with top tech companies worldwide.", icon: <FaGlobe /> },
  { year: "2018", event: "Reached 100K+ satisfied customers.", icon: <FaUsers /> },
  { year: "2020", event: "Expanded into healthcare, fashion, and food categories.", icon: <FaMedal /> },
  { year: "2023", event: "Launched mobile app with AI-powered recommendations.", icon: <FaRocket /> },
];

const About = () => {
  return (
    <div className={styles.mainContainer}>
      
      
      <section className={styles.aboutContent}>
        <h1>About Nexora</h1>
        <p>
          Nexora is your one-stop online store for high-quality products with a seamless shopping experience.
          We aim to make online shopping fast, secure, and reliable.
        </p>
        <p>
          Our mission is to provide trusted products from global partners and ensure customer satisfaction every step of the way.
        </p>
      </section>

      
      <section className={styles.historySection}>
        <h2>Our Journey</h2>
        <div className={styles.timeline}>
          {companyHistory.map((item, idx) => (
            <div key={idx} className={styles.timelineItem} style={{ "--i": idx }}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.year}>{item.year}</div>
              <div className={styles.event}>{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      
      <section className={`${styles.marqueeSection} ${styles.partnersMarquee}`}>
        <h2>Our Trusted Partners</h2>
        <div className={styles.marquee}>
          <div className={`${styles.marqueeContent} ${styles.fastScroll}`}>
            {partners.map((p, idx) => (
              <a key={idx} href={p.link} target="_blank" rel="noopener noreferrer" className={styles.partnerLogo}>
                {p.isText ? (
                  <div className={styles.textLogo}>{p.name}</div>
                ) : (
                  <img src={p.logo} alt={p.name} />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      
      <section className={`${styles.marqueeSection} ${styles.testimonialsMarquee}`}>
        <h2>What Our Users Say</h2>
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            {users.map((u, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                "{u.review}" - <strong>{u.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className={`${styles.marqueeSection} ${styles.usersMarquee}`}>
        <h2>Our Trusted Users</h2>
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            {users.map((u, idx) => (
              <div key={idx} className={styles.userAvatar}>
                <p>{u.name.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

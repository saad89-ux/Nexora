import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [categoriesData, setCategoriesData] = useState({});
  const [searchedProduct, setSearchedProduct] = useState("");
  const [heroVideos, setHeroVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    "smartphones", "laptops", "fragrances", "skincare", "groceries",
    "home-decoration", "furniture", "tops", "womens-dresses", "womens-shoes",
    "mens-shirts", "mens-shoes", "mens-watches", "womens-watches",
    "womens-bags", "womens-jewellery", "sunglasses", "automotive",
    "motorcycle", "lighting"
  ];

  
  useEffect(() => {
    const fetchProducts = async () => {
      let data = {};
      for (let cat of categories) {
        let res = await axios.get(`https://dummyjson.com/products/category/${cat}`);
        data[cat] = res.data.products;
      }
      setCategoriesData(data);
    };
    fetchProducts();

    
    setHeroVideos([
      "/videos/1.webm",
      "/videos/2.webm",
      "/videos/3.webm",
      "/videos/4.webm",
      "/videos/5.webm",
      "/videos/8.webm",
      "/videos/9.webm",
      "/videos/10.mp4",
      "/videos/11.mp4",
    ]);
  }, []);


  useEffect(() => {
    if (heroVideos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
    }, 9000); 
    return () => clearInterval(interval);
  }, [heroVideos]);


  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroVideos.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
  };

  return (
    <div className={styles.homeWrapper}>
     
      {heroVideos.length > 0 && (
        <div className={styles.heroSection}>
          {heroVideos.map((video, index) => (
            <video
              key={index}
              src={video}
              className={`${styles.heroVideo} ${currentIndex === index ? styles.active : ""}`}
              autoPlay
              muted
              loop
            />
          ))}

          <button className={styles.leftArrow} onClick={prevSlide}>❮</button>
          <button className={styles.rightArrow} onClick={nextSlide}>❯</button>
        </div>
      )}

      
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search your favorite product..."
          className={styles.searchBox}
          value={searchedProduct}
          onChange={(e) => setSearchedProduct(e.target.value)}
        />
      </div>

      
      {Object.keys(categoriesData).map((cat) => {
        const filteredProducts = categoriesData[cat].filter((p) =>
          p.title.toLowerCase().includes(searchedProduct.toLowerCase())
        );
        if (!filteredProducts.length) return null;

        return (
          <div key={cat} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{cat}</h2>
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.productImage}
                  />
                  <h3 className={styles.productTitle}>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className={styles.productPrice}>${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

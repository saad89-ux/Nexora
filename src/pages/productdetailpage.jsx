import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../Firebase/fireapp"; 
import styles from "./ProductDetail.module.css";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const fakeUsers = ["Ali K.", "Sara L.", "Omar H.", "Hina F.", "Zainab Q.", "Usman T.", "Ayesha M.", "Bilal R."];
const fakeComments = [
  "Excellent product, highly recommend!",
  "Good quality, fast delivery!",
  "Not bad, could be better.",
  "Loved it! Will buy again.",
  "Average product, okay for the price.",
  "Amazing, exactly as described!",
  "Worth the money!",
  "Very satisfied with the purchase."
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const generateReviews = () => {
    const shuffledUsers = [...fakeUsers].sort(() => 0.5 - Math.random());
    const shuffledComments = [...fakeComments].sort(() => 0.5 - Math.random());
    const count = Math.min(4, shuffledUsers.length);
    const dynamicReviews = [];
    for (let i = 0; i < count; i++) {
      dynamicReviews.push({
        user: shuffledUsers[i],
        comment: shuffledComments[i],
        rating: Math.floor(Math.random() * 3) + 3
      });
    }
    setReviews(dynamicReviews);
  };

  useEffect(() => {
    fetchProduct();
    generateReviews();
  }, [id]);

  const addToCart = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("Please login to add to cart");
        return;
      }

      await addDoc(collection(db, "ProductDetail"), {
        ...product,
        Timestamp: new Date(),
        Quantity: quantity,
        Address: address,
        userUID: currentUser.uid, 
      });

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }, [product, quantity, address]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={styles.detailWrapper}>
      {product?.title ? (
        <div className={styles.productContainer}>
          <div className={styles.imageSection}>
            <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productDescription}>{product.description}</p>

            <div className={styles.quantitySection}>
              <span>Quantity:</span>
              <button onClick={decrement}>-</button>
              <span>{quantity}</span>
              <button onClick={increment}>+</button>
            </div>

            <div className={styles.addressSection}>
              <input
                type="text"
                placeholder="Enter your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button className={styles.addCartBtn} onClick={addToCart}>
              <FaShoppingCart style={{ marginRight: "8px" }} /> Add to Cart
            </button>

            <div className={styles.additionalInfo}>
              <h3>Additional Information</h3>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Rating:</strong> {product.rating} ⭐</p>
            </div>

            <div className={styles.reviewsSection}>
              <h3>Customer Reviews</h3>
              {reviews.map((rev, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <strong>{rev.user}</strong>
                  <div className={styles.stars}>
                    {Array.from({ length: rev.rating }).map(( i) => <FaStar key={i} />)}
                    {Array.from({ length: 5 - rev.rating }).map(( i) => <FaStar key={i + 10} style={{ opacity: 0.3 }} />)}
                  </div>
                  <p>{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h2 className={styles.loading}>Loading product...</h2>
      )}
    </div>
  );
};

export default ProductDetailPage;

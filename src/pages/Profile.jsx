import { collection, deleteDoc, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db, auth } from "../Firebase/fireapp";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [UpdatedQuantity, setUpdatedQuantity] = useState("");
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [UpdatedAddress, setUpdatedAddress] = useState("");

  const Fetchinguserorders = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const q = query(
        collection(db, "ProductDetail"),
        where("userUID", "==", currentUser.uid) 
      );

      const querySnapshot = await getDocs(q);
      const Products = querySnapshot.docs.map((docs) => ({
        firestoreId: docs.id,
        ...docs.data(),
        Timestamp: new Date(),
      }));
      setProducts(Products);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const DeleteOrder = async (firestoreId) => {
    try {
      await deleteDoc(doc(db, "ProductDetail", firestoreId));
      await Fetchinguserorders();
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error.message);
      alert("Failed to delete order: " + error.message);
    }
  };

  const Editquantity = async (firestoreId) => {
    try {
      await updateDoc(doc(db, "ProductDetail", firestoreId), {
        Quantity: Number(UpdatedQuantity),
      });
      await Fetchinguserorders();
      setEditingId(null);
      setUpdatedQuantity("");
      alert("Quantity updated!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const EditAddress = async (firestoreId) => {
    try {
      await updateDoc(doc(db, "ProductDetail", firestoreId), {
        Address: UpdatedAddress,
      });
      await Fetchinguserorders();
      setEditingAddressId(null);
      setUpdatedAddress("");
      alert("Address updated!");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    Fetchinguserorders();
  }, []);

  const LogginoutHandler = () => {
    localStorage.removeItem("userUID");
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileHeader}>
        <h1>Your Orders Are Listed Here</h1>
      </div>

      <ul className={styles.ordersGrid}>
        {products.map((p) => (
          <li key={p.firestoreId} className={styles.orderCard}>
            {p.thumbnail && <img src={p.thumbnail} alt={p.title} className={styles.productImage} />}
            <h2 className={styles.productTitle}>{p.title}</h2>
            <p className={styles.productPrice}>Price: ${p.price}</p>
            <p>Quantity: {p.Quantity}</p>
            <p>Address: {p.Address}</p>

            <button className={styles.deleteBtn} onClick={() => DeleteOrder(p.firestoreId)}>
              Delete Order
            </button>

            {editingId === p.firestoreId ? (
              <div>
                <input
                  className={styles.editInput}
                  type="number"
                  placeholder="Enter Updated Quantity"
                  value={UpdatedQuantity}
                  onChange={(e) => setUpdatedQuantity(e.target.value)}
                />
                <button className={styles.deleteBtn} onClick={() => Editquantity(p.firestoreId)}>Save</button>
                <button className={styles.deleteBtn} onClick={() => { setEditingId(null); setUpdatedQuantity(""); }}>Cancel</button>
              </div>
            ) : (
              <button className={styles.deleteBtn} onClick={() => { setEditingId(p.firestoreId); setUpdatedQuantity(p.Quantity ?? ""); }}>Edit Quantity</button>
            )}

            {editingAddressId === p.firestoreId ? (
              <div>
                <input
                  className={styles.editInput}
                  type="text"
                  placeholder="Enter Updated Address"
                  value={UpdatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                />
                <button className={styles.deleteBtn} onClick={() => EditAddress(p.firestoreId)}>Save</button>
                <button className={styles.deleteBtn} onClick={() => { setEditingAddressId(null); setUpdatedAddress(""); }}>Cancel</button>
              </div>
            ) : (
              <button className={styles.deleteBtn} onClick={() => { setEditingAddressId(p.firestoreId); setUpdatedAddress(p.Address ?? ""); }}>Edit Address</button>
            )}
          </li>
        ))}
      </ul>

      <button className={styles.logoutBtn} onClick={LogginoutHandler}>Log Out</button>
    </div>
  );
};

export default Profile;

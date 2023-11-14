import React from "react";
import { useProductContext } from "../../context/productContext";
import { useState } from "react";
import { useAuthValue } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import styles from "./cart.module.css";
import CartItem from "./cartItem/CartItem";
import { toast } from "react-toastify";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const { cart, total, clearCart, purchaseAll, itemInCart } =
    useProductContext();
  const { userLoggedIn } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handlePurchase = () => {
    if (itemInCart === 0)
      return toast.error("Nothing in your  cart to purchase!!!");
    purchaseAll();
    toast.success("Your cart has been placed successfully");
    navigate("/myOrder");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <h1>
            hey {userLoggedIn.name}, <small>your cart has </small>
          </h1>
        </div>
        <div className={styles.cartDetails}>
          <div>
            Item : {itemInCart}
            <br />
            <button className={styles.removeAll} onClick={clearCart}>
              Remove All
            </button>
          </div>
          <div>
            Total Amount : RS {total}
            <br />
            <button onClick={handlePurchase} className={styles.purchaseAll}>
              Purchase All
            </button>
          </div>
        </div>
      </div>
      <div className={styles.itemContainer}>
        {cart.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>
              Nothing in your cart{" "}
            </h1>
            <p>
              <Link
                style={{
                  color: "red",
                  textTransform: "capitalize",
                  fontSize: "25px",
                  textDecoration:"none",
                  fontFamily: "monospace"
                }}
                to="/"
              >
                back to Shopping...
              </Link>
            </p>
          </div>
        ) : (
          <>
            {cart.map((product, i) => {
              return <CartItem product={product} key={i} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

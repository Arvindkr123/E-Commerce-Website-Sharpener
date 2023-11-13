import React from "react";
import styles from "./item.module.css";
import { useProductContext } from "../../../context/productContext";
export default function Item({ item }) {
  const { name, price, category, image } = item;
  const { addToCart } = useProductContext();
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img src={image} alt="" />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.namePrice}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>RS {price}</div>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.addbtn}
            onClick={() => {
              addToCart(item);
            }}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

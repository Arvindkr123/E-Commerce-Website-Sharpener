import React from "react";
import { useProductContext } from "../../../context/productContext";
import styles from "./cartItem.module.css";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
const CartItem = ({ product }) => {
  const { name, price, image, quantity, category } = product;
  const { removefromCart, increaseQuantity, decreaseQuantity } =
    useProductContext();
  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.imageContainer}>
          <img src={image} alt={category} />
        </div>
        <div className={styles.itemInfo}>
          <div className={styles.namePrice}>
            <div className={styles.name}>{name}</div>
          </div>
          <div className={styles.priceQuant}>RS.{price}</div>
          <div className={styles.quantity}>
            <span className={styles.minus}>
              <AiFillMinusCircle onClick={() => decreaseQuantity(quantity)} />
            </span>
            &nbsp;{quantity}&nbsp;
            <span className={styles.plus}>
              <AiFillPlusCircle onClick={() => increaseQuantity(quantity)} />
            </span>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={() => removefromCart(product)}>
            Remove from cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;

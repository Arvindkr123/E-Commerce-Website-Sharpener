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
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <img src={image} alt={category} />
        </div>
        <div className={styles.itemInfo}>
          <div className={styles.namePrice}>
            <div className={styles.name}>{name.substring(0, 20)}...</div>
          </div>
          <div className={styles.price}>RS {price}</div>
          <div className={styles.allbtn}>
            <div className={styles.quantity}>
              <span className={styles.minus}>
                <AiFillMinusCircle
                  color="blue"
                  onClick={() => decreaseQuantity(product)}
                />
              </span>
              &nbsp;{quantity}&nbsp;
              <span className={styles.plus}>
                <AiFillPlusCircle
                  color="blue"
                  onClick={() => increaseQuantity(product)}
                />
              </span>
            </div>

            <button
              className={styles.btnContainer}
              onClick={() => removefromCart(product)}
            >
              Remove from cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

import React from "react";
import styles from "../myOrder.module.css";
export default function OrderDetails({ order }) {
  const { date, list, amount } = order;
  return (
    <div>
      <h1>Order On: {date}</h1>
      <table className={styles.table}>
        <tr>
          <th>S.NO</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>
        {list.map((product, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{product.name.substring(0, 40)}</td>
              <td>$ {product.price}</td>
              <td>{product.quantity}</td>
              <td>RS {product.quantity * product.price}</td>
            </tr>
          );
        })}
        <tr className={styles.grandTotal}>
          <td>Grand Total</td>
          <td>$ {Math.round(amount)}</td>
        </tr>
      </table>
    </div>
  );
}

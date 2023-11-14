import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useProductContext } from "../../context/productContext";
import styles from "./myOrder.module.css";
import { Link } from "react-router-dom";
import OrderDetails from "./orderDeatils/OrderDetails";

export default function MyOrder() {
  const [loading, setLoading] = useState(true);
  const { myOrders } = useProductContext();
  //console.log(myOrders);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.mainContainer}>
      <div>
        <h1 id={styles.orderHeading}>My Orders</h1>
        {myOrders.length > 0 ? (
          <>
            {myOrders.map((order, i) => (
              <OrderDetails key={i} order={order} />
            ))}
          </>
        ) : (
          <>
            <h1>You haven't placed any order yet</h1>
            <Link to={"/"}>⬅ Start Shopping ➡</Link>
          </>
        )}
      </div>
    </div>
  );
}

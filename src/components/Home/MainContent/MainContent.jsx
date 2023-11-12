import React from "react";
import styles from "./MainContent.module.css";
import { useProductContext } from "../../../context/productContext";
import Item from "../Item/Item";
export default function MainContent({ search, price, category, applyFilter }) {
  const { data } = useProductContext();
  return (
    <div className={styles.itemContainer}>
      {data
        .filter((item) => {
          return search.toLocaleLowerCase() === ""
            ? item
            : item.name.toLocaleLowerCase().includes(search);
        })
        .filter((item) => {
          return !applyFilter ? item : item.price <= price;
        })
        .filter((item) => {
          return !applyFilter || category === "none"
            ? item
            : item.category === category;
        })
        .map((item) => {
          return <Item key={item.id} item={item} />;
        })}
    </div>
  );
}

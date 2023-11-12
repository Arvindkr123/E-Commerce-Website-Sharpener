import React from "react";
import styles from "./Filter.module.css";
const FilterBar = ({ price, setPrice, category, setCategory }) => {
  return (
    <div className={styles.filterbar}>
      <h1>FilterBar</h1>
      <div className={styles.priceRange}>
        <span>Price</span>
        {`<=${price}`}
        <input
          type="range"
          min={100}
          max={10000}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={styles.categoryBox}>
        <span>Category</span>
        <div>
          <input
            type="radio"
            value="men"
            name="category"
            id="men"
            onClick={() => setCategory("men")}
          />
          <label htmlFor="men">Men</label>
          <input
            type="radio"
            value="women"
            name="category"
            id="women"
            onClick={() => setCategory("women")}
          />
          <label htmlFor="women">Women</label>
          <input
            type="radio"
            value="electronic"
            name="category"
            id="electronic"
            onClick={() => setCategory("electronic")}
          />
          <label htmlFor="electronic">Electronic</label>
          <input
            type="radio"
            value="jewellary"
            name="category"
            id="jewellary"
            onClick={() => setCategory("jewellary")}
          />
          <label htmlFor="jewellary">Jewellary</label>
          <input
            type="radio"
            value="none"
            name="category"
            id="none"
            onClick={() => setCategory("none")}
          />
          <label htmlFor="none">None</label>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

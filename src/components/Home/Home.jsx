import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import styles from "./Home.module.css";
import FilterBar from "./FilterBar/FilterBar";
import MainContent from "./MainContent/MainContent";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [applyFilter, setApplyFilter] = useState(false);
  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("none");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search Item..."
            />
            <button onClick={() => setApplyFilter(!applyFilter)}>
              {applyFilter ? "Cancel" : "apply filter"}
            </button>
          </div>
          <div className={styles.mainContainer}>
            {applyFilter && (
              <FilterBar
                price={price}
                setPrice={setPrice}
                category={category}
                setCategory={setCategory}
              />
            )}
          </div>
          <MainContent
            search={search}
            price={price}
            category={category}
            applyFilter={applyFilter}
          />
        </>
      )}
    </>
  );
}

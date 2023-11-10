import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthValue } from "../../context/authContext";
import { FaBuysellads, FaHome, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { GoSignIn } from "react-icons/go";
const Navbar = () => {
  const { signOut, isLoggedIn } = useAuthValue();
  return (
    <div>
      <div className={styles.navbarContainer}>
        {/*===================== Logo =======================*/}
        <div className={styles.appName}>
          <NavLink to={"/"}>
            <span>
              <i class="fa-solid fa-shop"></i>
              Arvind Ecommerce
            </span>
          </NavLink>
        </div>

        {/*================ NavLinks================ */}
        <div className={styles.navLinks}>
          <NavLink to={"/"}>
            <span>
              <i class="fa-solid fa-house"></i>
              Home
            </span>
          </NavLink>

          {isLoggedIn && (
            <NavLink to={"/myOrder"}>
              <span>
                <MdOutlineShoppingBag />
                MyOrder
              </span>
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to={"/cart"}>
              <span>
                <i class="fa-solid fa-cart-shopping"></i>
                Cart
              </span>
            </NavLink>
          )}

          <NavLink to={!isLoggedIn ? "/signIn" : "/"}>
            <span>
              {!isLoggedIn ? (
                <>
                  <GoSignIn />
                  signIn
                </>
              ) : (
                <span onClick={signOut}>
                  <FaSignOutAlt />
                  signOut
                </span>
              )}
            </span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;

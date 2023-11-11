import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useAuthValue } from "./authContext";
import { toast } from "react-toastify";
import { data } from "../components/data/data";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const ProductContext = createContext();
export const useProductContext = () => {
  let value = useContext(ProductContext);
  return value;
};

export const ProductContextProvider = ({ children }) => {
  const [itemInCart, setItemInCart] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [myOrders, setMyOrders] = useState([]);
  const { isLoggedIn, setIsLoggedIn, userLoggedIn, setUserLoggedIn } =
    useAuthValue();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const index = localStorage.getItem("index");
      const user = JSON.parse(index);
      setIsLoggedIn(true);
      setUserLoggedIn(user);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const snapshot = onSnapshot(doc(db, "users", userLoggedIn.id), (doc) => {
        setCart(doc.data().cart);
        setMyOrders(doc.data().orders);
      });
      let sum = cart.reduce((acc, curr) => acc + Number(curr.price), 0);
      setTotal(sum);
      setItemInCart(cart.length);
    }
  }, [userLoggedIn]);

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      toast.error("please login first..");
      return;
    }
    const index = cart.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      // item is already in the cart then increase the quantity
      increaseQuantity(cart[index]);
      return;
    }
    // insert new item
    const userRef = doc(db, "users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayUnion({ quantity: 1, ...product }),
    });
    setTotal(Number(total + product.price));
    setItemInCart(itemInCart + 1);
    toast.success("added to cart successfully");
  };

  async function increaseQuantity(product) {
    const index = cart.findIndex((item) => item.name === product.name);
    cart[index].quantity++;
    setCart(cart);

    // now update in database
    const userRef = doc(db, "users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
    setItemInCart(itemInCart + 1);
    setTotal(Number(total + cart[index].price));
  }

  async function decreaseQuantity(product) {
    const index = cart.findIndex((item) => item.name === product.name);
    setTotal(Number(total - cart[index].price));

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    setCart(cart);
    setItemInCart(itemInCart - 1);

    const userRef = doc(db, "users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
  }

  async function removefromCart(product) {
    const userRef = doc(db, "users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayRemove(product),
    });
    setTotal(Number(total - product.quantity * product.price));
    setItemInCart(itemInCart - product.quantity);
    toast.success("remove from cart successfully!!!");
  }

  async function clearCart() {
    if (itemInCart === 0) {
      toast.error("Nothing in cart to clear!");
      return;
    }
    const userRef = doc(db, "users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });
    setTotal(0);
    setItemInCart(0);
    toast.success("Clear cart successfully!!!");
  }

  function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  async function purchaseAll() {
    const currentDate = getDate();
    const userRef = doc(db, "users", userLoggedIn.id);
    await updateDoc(userRef, {
      orders: arrayUnion({ date: currentDate, list: cart, amount: total }),
    });
    clearCart();
  }

  return (
    <ProductContext.Provider
      value={{
        itemInCart,
        cart,
        total,
        myOrders,
        setTotal,
        setItemInCart,
        setMyOrders,
        purchaseAll,
        removefromCart,
        addToCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        data,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

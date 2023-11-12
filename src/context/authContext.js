import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";

export const AuthContext = createContext();

export const useAuthValue = () => {
  const value = useContext(AuthContext);
  return value;
};
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // which user is logged in
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  // list of users in our database
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUserList(users);
    });
  }, [isLoggedIn]);

  const createUser = async (data) => {
    const index = userList.findIndex((user) => user.email === data.email);
    if (index !== -1) {
      toast.error("Email already exitsts, Try again or signin");
      return;
    }

    const docRef = await addDoc(collection(db, "users"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
      orders: [],
    });
    toast.success("new user added successfully, Please login to continue");
  };

  const signIn = async (data) => {
    const index = userList.findIndex((user) => user.email === data.email);
    if (index === -1) {
      toast.error("Email not exitsts, Try to signUp");
      return;
    }
    if (userList[index].password === data.password) {
      toast.success("signup successfully!!!");
      setIsLoggedIn(true);
      setUserLoggedIn(userList[index]);

      localStorage.setItem("token", true);
      localStorage.setItem("index", JSON.stringify(userList[index]));
      return true;
    } else {
      toast.error("wrong password try again");
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("index");

    setIsLoggedIn(false);
    setUserLoggedIn(null);
    toast.success("logout successfully..");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        createUser,
        isLoggedIn,
        setIsLoggedIn,
        userLoggedIn,
        setUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

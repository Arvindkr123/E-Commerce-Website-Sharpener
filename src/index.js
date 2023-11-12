import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/authContext";
import { ProductContextProvider } from "./context/productContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <App />
        <ToastContainer />
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();

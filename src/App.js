import React from "react";
import {
  Cart,
  Error,
  Home,
  MyOrder,
  Navbar,
  SignIn,
  SignUp,
} from "./components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signIn",
          element: <SignIn />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/myOrder",
          element: <MyOrder />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

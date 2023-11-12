import React from "react";
import { Cart, Home, Navbar, SignIn, SignUp } from "./components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
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

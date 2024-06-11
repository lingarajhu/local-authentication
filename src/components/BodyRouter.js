import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";
import LogIn from "./LogIn";

const BodyRouter = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
    },
    {
      path: "/body",
      element: <Body />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default BodyRouter;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./components/PageComponents/Welcome/Welcome";
import ErrorPage from "./components/PageComponents/ErrorPage/ErrorPage";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

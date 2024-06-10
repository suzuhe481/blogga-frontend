import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/PageComponents/Home/Home";
import Post from "./components/PageComponents/Post/Post";
import Profile from "./components/PageComponents/Profile/Profile";
import Search from "./components/PageComponents/Search/Search";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user/:id",
      element: <Profile />,
    },
    {
      path: "/post/:id",
      element: <Post />,
    },
    {
      path: "/search",
      element: <Search />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

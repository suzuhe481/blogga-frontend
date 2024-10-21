import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./components/PageComponents/Welcome/Welcome";
import Blog from "./components/PageComponents/Blog/Blog";
import Profile from "./components/PageComponents/Profile/Profile";
import BrowseBlogsPage from "./components/PageComponents/BrowseBlogsPage/BrowseBlogsPage";
import LoginPage from "./components/PageComponents/LoginPage/LoginPage";
import Verify from "./components/PageComponents/Verify/Verify";
import CreateBlogPage from "./components/PageComponents/CreateBlogPage/CreateBlogPage";
import UserSettingsPage from "./components/PageComponents/UserSettingsPage/UserSettingsPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/user/:id",
      element: <Profile />,
    },
    {
      path: "/blog/:id",
      element: <Blog />,
    },
    {
      path: "/browse",
      element: <BrowseBlogsPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/verify",
      // element: <SendVerify />
    },
    {
      path: "/verify/:token",
      element: <Verify />,
    },
    {
      path: "/create",
      element: <CreateBlogPage />,
    },
    {
      path: "/user/settings",
      element: <UserSettingsPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

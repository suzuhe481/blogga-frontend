import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./components/PageComponents/Welcome/Welcome";
import Blog from "./components/PageComponents/Blog/Blog";
import Profile from "./components/PageComponents/Profile/Profile";
import Search from "./components/PageComponents/Search/Search";
import LoginForm from "./components/PageComponents/LoginForm/LoginForm";
import SignupForm from "./components/PageComponents/SignupForm/SignupForm";
import Verify from "./components/PageComponents/Verify/Verify";
import CreateBlogPage from "./components/PageComponents/CreateBlogPage/CreateBlogPage";

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
      path: "/search",
      element: <Search />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

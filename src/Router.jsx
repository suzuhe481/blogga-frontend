import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/PageComponents/Home/Home";
import Post from "./components/PageComponents/Post/Post";
import Profile from "./components/PageComponents/Profile/Profile";
import Search from "./components/PageComponents/Search/Search";
import LoginForm from "./components/PageComponents/LoginForm/LoginForm";
import SignupForm from "./components/PageComponents/SignupForm/SignupForm";

import Test from "./components/Test/Test";

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
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
    },
    {
      path: "test",
      element: <Test />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

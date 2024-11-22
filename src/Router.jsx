import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./components/PageComponents/Welcome/Welcome";
import Blog from "./components/PageComponents/Blog/Blog";
import ProfilePage from "./components/PageComponents/ProfilePage/ProfilePage";
import BrowseBlogsPage from "./components/PageComponents/BrowseBlogsPage/BrowseBlogsPage";
import LoginPage from "./components/PageComponents/LoginPage/LoginPage";
import SendVerifyPage from "./components/PageComponents/SendVerifyPage/SendVerifyPage";
import Verify from "./components/PageComponents/VerifyPage/VerifyPage";
import CreateBlogPage from "./components/PageComponents/CreateBlogPage/CreateBlogPage";
import EditBlogPage from "./components/PageComponents/EditBlogPage/EditBlogPage";
import UserSettingsPage from "./components/PageComponents/UserSettingsPage/UserSettingsPage";
import TermsConditionsPage from "./components/PageComponents/TermsConditionsPage/TermsConditionsPage";
import PrivacyPolicyPage from "./components/PageComponents/PrivacyPolicyPage/PrivacyPolicyPage";
import ErrorPage from "./components/PageComponents/ErrorPage/ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
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
      element: <SendVerifyPage />,
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
      path: "/blog/edit/:id",
      element: <EditBlogPage />,
    },
    {
      path: "/user/settings",
      element: <UserSettingsPage />,
    },
    {
      path: "/terms-and-conditions",
      element: <TermsConditionsPage />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicyPage />,
    },
    {
      path: "/user/:id",
      element: <ProfilePage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

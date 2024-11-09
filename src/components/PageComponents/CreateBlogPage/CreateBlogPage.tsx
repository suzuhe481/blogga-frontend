import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import BlogCreateForm from "./BlogCreateForm";
import BlogCreateSuccess from "./BlogCreateSuccess";
import NotVerifiedWarning from "./NotVerifiedWarning";

import checkUserVerificationUtil from "../../../helpers/checkUserVerificationUtil";

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const [formSuccess, setFormSuccess] = useState(false);
  const [blogId, setBlogId] = useState("");

  const [userLoggedIn, setUserLoggedIn] = useState(undefined);
  const [userVerified, setUserVerified] = useState(false);

  // Gets the user's logged in and verified status.
  useEffect(() => {
    const getUserStatus = async () => {
      const result = await checkUserVerificationUtil();

      // Redirect to error page if user is not logged in
      if (!result.userLoggedIn) {
        // redirect to 404 page
        navigate("whoops");
      }

      // Sets loggedin state
      if (result.userLoggedIn) {
        setUserLoggedIn(result.userLoggedIn);
      }

      // Sets verified state
      if (result.userVerified) {
        setUserVerified(result.userVerified);
      }
    };

    getUserStatus();
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex justify-center items-center w-full h-full">
        {userLoggedIn && !userVerified ? <NotVerifiedWarning /> : null}

        {userLoggedIn && userVerified && formSuccess ? (
          <BlogCreateSuccess blogId={blogId} />
        ) : userLoggedIn && userVerified ? (
          <BlogCreateForm
            setFormSuccess={setFormSuccess}
            setBlogId={setBlogId}
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;

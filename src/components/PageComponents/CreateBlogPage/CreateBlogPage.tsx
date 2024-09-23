import { useState } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import BlogCreateForm from "./BlogCreateForm";
import BlogCreateSuccess from "./BlogCreateSuccess";

import { bouncy } from "ldrs";

const CreateBlogPage = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [blogId, setBlogId] = useState("");

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center w-full h-full">
        {formSuccess ? (
          <BlogCreateSuccess blogId={blogId} />
        ) : (
          <BlogCreateForm
            setFormSuccess={setFormSuccess}
            setBlogId={setBlogId}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;

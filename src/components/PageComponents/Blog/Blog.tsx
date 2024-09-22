import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import BlogView from "./BlogView";

const Blog = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <BlogView />
      <Footer />
    </div>
  );
};

export default Blog;

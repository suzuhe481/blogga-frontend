import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import BlogView from "./BlogView";

const Blog = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen overflow-hidden">
      <Navbar />
      <BlogView />
      <Footer />
    </div>
  );
};

export default Blog;

import { useState, useEffect } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";

import getMultipleBlogsUtil from "../../../helpers/getMultipleBlogsUtil";

export interface Iblog {
  title: string;
  date: string;
  blog: string;
}

const BrowseBlogsPage = () => {
  const [blogData, setBlogData] = useState<Iblog[] | []>([]);
  const [blogCount, setBlogCount] = useState(5);
  const [blogEndReached, setBlogEndReached] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);

  //   console.log(blogData);
  //   console.log(blogCount);

  function LoadMoreBlogs() {
    setBlogCount((prev) => prev + 5);

    // getMultipleBlogsUtil(blogCount).then((result) => {
    //   //   console.log(result);
    //   //   setBlogData(result.multiplePosts);
    //   setBlogData([...result.multiplePosts]);
    //   setBlogCount((prev) => prev + 3);
    // });
  }

  // Gets multiple blogs
  useEffect(() => {
    if (blogEndReached) {
      return;
    }
    setBlogsLoading(true);

    setTimeout(() => {
      getMultipleBlogsUtil(blogCount).then((result) => {
        //   console.log(result);

        setBlogData(result.multiplePosts);
        setBlogEndReached(result.blogEndReached);
        setBlogsLoading(false);

        //   setBlogCount((prev) => prev + 3);
      });
    }, 700);

    // LoadMoreBlogs();
    // setInitialLoad(false);
    // getMultipleBlogsUtil(blogCount).then((result) => {
    //   //   console.log(result);

    //   setBlogData(result.multiplePosts);
    //   setBlogEndReached(result.blogEndReached);
    //   setBlogsLoading(false);

    //   //   setBlogCount((prev) => prev + 3);
    // });
  }, [blogCount]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div>BlogCount: {blogCount}</div>
        <div>
          <div>
            {blogData.map((blog, index) => {
              return <div key={index}>{blog.title}</div>;
            })}
          </div>
          {blogsLoading ? (
            <div>Loading...</div>
          ) : blogEndReached ? (
            <div>End of Blogs</div>
          ) : (
            <button onClick={LoadMoreBlogs}>
              Click here to load more blogs
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseBlogsPage;

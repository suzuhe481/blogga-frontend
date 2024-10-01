import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import PageSwitcher from "./PageSwitcher";

import { ring } from "ldrs";

import getMultipleBlogsUtil from "../../../helpers/getMultipleBlogsUtil";

export interface Iblog {
  title: string;
  date: string;
  blog: string;
}

const BrowseBlogsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState<Iblog[] | []>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsPerPage, setBlogsPerPage] = useState(
    Number(searchParams.get("blogsPerPage")) || 5
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [totalBlogCount, setTotalBlogCount] = useState<number | null>(null);

  ring.register();

  // Display loading spinner when blogs are being retrieved.
  // Loading animation is fixed in the center of the screen.
  const loadingAnimation = (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <l-ring
        size="100"
        stroke="15"
        bg-opacity="0.4"
        speed="2"
        color="rgb(59, 189, 248)"
      />
    </div>
  );

  // Handler function for the select element to chang the blogsPerPage state.
  function handleBlogsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setBlogsPerPage(Number(e.target.value));
  }

  const EmptyBlogs = (
    <div className="text-center font-bold text-lg">No blogs to display</div>
  );

  // Gets multiple blogs on page change and blogsPerPage change.
  useEffect(() => {
    setBlogsLoading(true);

    setTimeout(() => {
      getMultipleBlogsUtil(currentPage, blogsPerPage).then((result) => {
        if (result.error) {
          setTotalBlogCount(0);
          setBlogsLoading(false);
          return;
        }

        setCurrentPage(result.newCurrentPage);
        setTotalBlogCount(result.totalBlogCount);
        setBlogData(result.multiplePosts);
        setBlogsLoading(false);
      });
    }, 700);
  }, [currentPage, blogsPerPage]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full h-full px-40">
        {blogsLoading ? loadingAnimation : ""}
        <div className="flex flex-row w-full justify-end gap-1">
          <label htmlFor="blogsPerPage">Blogs Per Page:</label>
          <select
            name="blogsPerPage"
            id="blogsPerPage"
            onChange={handleBlogsPerPageChange}
            className="border-black border-2"
          >
            <option value="2">2</option>
            <option value="5" selected={true}>
              5
            </option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>

        <div>
          <div>
            {totalBlogCount === 0
              ? EmptyBlogs
              : blogData.map((blog, index) => {
                  return <div key={index}>{blog.title}</div>;
                })}
          </div>
        </div>

        {totalBlogCount && totalBlogCount > 0 ? (
          <PageSwitcher
            blogsPerPage={blogsPerPage}
            currentPage={currentPage}
            totalBlogCount={totalBlogCount}
            setCurrentPage={setCurrentPage}
            blogsLoading={blogsLoading}
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default BrowseBlogsPage;

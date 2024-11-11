import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import PageSwitcher from "../BrowseBlogsPage/PageSwitcher";
import LoadingBlogCard from "../BrowseBlogsPage/LoadingBlogCard";
import BlogCard from "../BrowseBlogsPage/BlogCard";

import { ring } from "ldrs";

import { IBlogCard } from "../BrowseBlogsPage/BlogCard";

import getUserBlogsUtil from "../../../helpers/getUserBlogsUtil";

const UserBlogs = () => {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [userID, setUserID] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [blogData, setBlogData] = useState<IBlogCard[] | []>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const [displayLoadingCards, setDisplayLoadingCards] = useState(false);
  const [blogsPerPage, setBlogsPerPage] = useState(
    Number(searchParams.get("blogsPerPage")) || 5
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [totalBlogCount, setTotalBlogCount] = useState<number | null>(null);
  const [userExists, setUserExists] = useState<boolean>(false);

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

  const LoadingBlogCards = [...Array(6)].map((value, index) => {
    return <LoadingBlogCard key={index} />;
  });

  // Handler function for the select element to chang the blogsPerPage state.
  function handleBlogsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setBlogsPerPage(Number(e.target.value));
  }

  const EmptyBlogs = (
    <div className="text-center font-bold text-lg">No blogs to display</div>
  );

  // Sets the users id
  useEffect(() => {
    if (id !== undefined) {
      setUserID(id);
    }
  }, [id]);

  // Gets multiple blogs on page change and blogsPerPage change.
  useEffect(() => {
    // Prevents fetching if userID is empty
    if (userID === "") {
      return;
    }

    // Function that fetches requested blogs based on current page and blogs per page.
    const fetchBlogs = async () => {
      // Set initial loading states for a blog fetch.
      setShowSpinner(true);
      setBlogsLoading(true);
      setDisplayLoadingCards(false);

      // Timer.
      // If fetching blogs goes over specified time, displays loading blog cards.
      // TIME SET TO 0 to show loading cards.
      const timeoutId = setTimeout(() => {
        // If blogs are still loading,
        // replace the loading spinner with loading cards.
        if (blogsLoading) {
          setShowSpinner(false);
          setDisplayLoadingCards(true);
        }
      }, 0);

      getUserBlogsUtil(userID, currentPage, blogsPerPage)
        .then((result) => {
          if (result.error) {
            throw result;
          }

          setCurrentPage(result.newCurrentPage);
          setTotalBlogCount(result.totalBlogCount);
          setBlogData(result.userPosts);
          setAuthor(result.author);
          setUserExists(true);
        })
        .catch((error) => {
          console.log(error);
          setTotalBlogCount(0);
          setBlogsLoading(false);
          setUserExists(false);
        })
        .finally(() => {
          // After data is successfully retrieved.
          setBlogsLoading(false);
          setDisplayLoadingCards(false);
          setShowSpinner(false);
          clearTimeout(timeoutId);
        });
    };

    fetchBlogs();
  }, [userID, currentPage, blogsPerPage]);

  // Used for the useSearchParams hook
  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      blogsPerPage: blogsPerPage.toString(),
    });
  }, [currentPage, blogsPerPage, setSearchParams]);

  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-start items-center w-full min-h-screen">
        {blogsLoading && showSpinner ? (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {loadingAnimation}
          </div>
        ) : null}
        {userExists ? (
          <div className="flex w-[90vw] pt-4">
            <h1 className="w-full font-bold text-2xl desktop:text-4xl">
              {author}'s blogs
            </h1>
          </div>
        ) : (
          <div>This user does not exist.</div>
        )}
        <div className="flex flex-row w-[90vw] my-8 p-2 justify-end gap-1">
          <label htmlFor="blogsPerPage">Blogs Per Page:</label>
          <select
            name="blogsPerPage"
            defaultValue={"5"}
            id="blogsPerPage"
            onChange={handleBlogsPerPageChange}
            className="border-black border-2"
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
        <div className="flex justify-center items-center">
          {totalBlogCount === 0 ? EmptyBlogs : null}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {blogsLoading && displayLoadingCards ? LoadingBlogCards : null}
            {!blogsLoading &&
              blogData.length > 0 &&
              blogData.map((blog, index) => {
                return (
                  <BlogCard
                    key={index}
                    title={blog.title}
                    author={blog.author}
                    date={blog.date}
                    shortId={blog.shortId}
                    authorID={blog.authorID}
                  />
                );
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

export default UserBlogs;

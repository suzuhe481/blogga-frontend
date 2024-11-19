import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import PageSwitcher from "./PageSwitcher";
import BlogCard from "./BlogCard";
import LoadingBlogCard from "./LoadingBlogCard";

import { ring } from "ldrs";

export interface Iblog {
  title: string;
  date: string;
  author: string;
  shortId: string;
  authorID: string;
}

interface IBlogContainerProps {
  blogData: Array<Iblog>;
  blogsLoading: boolean;
  showSpinner: boolean;
  displayLoadingCards: boolean;
  totalBlogCount: number | null;
  blogsPerPage: number;
  setBlogsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  navigateString: string;
}

const BlogCardsContainer = ({
  blogData,
  blogsLoading,
  showSpinner,
  displayLoadingCards,
  totalBlogCount,
  blogsPerPage,
  setBlogsPerPage,
  currentPage,
  setCurrentPage,
  navigateString,
}: IBlogContainerProps) => {
  // Default values.
  const defaultPage = 1;
  const defaultBlogsPerPage = 5;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  // Updates the url parameters when states change.
  useEffect(() => {
    if (
      currentPage !== Number(searchParams.get("page")) ||
      blogsPerPage !== Number(searchParams.get("blogsPerPage"))
    ) {
      setSearchParams({
        page: currentPage.toString(),
        blogsPerPage: blogsPerPage.toString(),
      });
    }
  }, [currentPage, blogsPerPage]);

  // Updates the browser history when the currentPage and blogsPerPage state differs
  // from the url parameters.
  // Also avoids adding duplicates to the browser history.
  useEffect(() => {
    if (
      currentPage !== Number(searchParams.get("page")) ||
      blogsPerPage !== Number(searchParams.get("blogsPerPage"))
    ) {
      const currentPageParam =
        Number(searchParams.get("page")) > 0
          ? Number(searchParams.get("page"))
          : defaultPage;
      const blogsPerPageParam = Number(searchParams.get("blogsPerPage"))
        ? Number(searchParams.get("blogsPerPage"))
        : defaultBlogsPerPage;

      navigate(navigateString, {
        replace: true,
      });
    }
  }, [searchParams, navigate]);

  // Updates currentPage and blogsPerPage state with url parameters when the url changes.
  useEffect(() => {
    const currentPageParam =
      Number(searchParams.get("page")) > 0
        ? Number(searchParams.get("page"))
        : defaultPage;
    const blogsPerPageParam =
      Number(searchParams.get("blogsPerPage")) > 0
        ? Number(searchParams.get("blogsPerPage"))
        : defaultBlogsPerPage;

    if (currentPage !== currentPageParam) {
      setCurrentPage(currentPageParam);
    }

    if (blogsPerPage !== blogsPerPageParam) {
      setBlogsPerPage(blogsPerPageParam);
    }
  }, [searchParams]);

  return (
    <div
      className={`flex flex-col justify-start items-center w-full min-h-screen`}
    >
      {blogsLoading && showSpinner ? (
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {loadingAnimation}
        </div>
      ) : null}

      <div className="flex flex-row w-[90vw] my-8 p-2 justify-end gap-1">
        <label htmlFor="blogsPerPage">Blogs Per Page:</label>
        <select
          name="blogsPerPage"
          defaultValue={"5"}
          value={blogsPerPage}
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
  );
};

export default BlogCardsContainer;

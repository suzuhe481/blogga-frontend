import { useState, useEffect, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import BlogCardsContainer from "../../UI/BlogCardsContainer/BlogCardsContainer";

import getMultipleBlogsUtil from "../../../helpers/getMultipleBlogsUtil";

import { IBlogCard } from "../../UI/BlogCardsContainer/BlogCard";

const BrowseBlogsPage = () => {
  // Default values.
  const defaultPage = 1;
  const defaultBlogsPerPage = 5;

  const [searchParams, setSearchParams] = useSearchParams();

  const [blogData, setBlogData] = useState<IBlogCard[] | []>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const [displayLoadingCards, setDisplayLoadingCards] = useState(false);

  // States for url search parameters
  // Sets the initial state to the current parameters in the url or the default values.
  const [blogsPerPage, setBlogsPerPage] = useState(() => {
    const blogsPerPage = Number(searchParams.get("blogsPerPage"));

    return blogsPerPage > 0 ? blogsPerPage : defaultBlogsPerPage;
  });
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const currentPage = Number(searchParams.get("page"));

    return currentPage > 0 ? currentPage : defaultPage;
  });
  const [totalBlogCount, setTotalBlogCount] = useState<number | null>(null);

  // This sets up the navigateString that gets passed to the BlogCardsContainer component.
  // This is the template of the URL for this component, which can change based on variables.
  const currentPageParam =
    Number(searchParams.get("page")) > 0
      ? Number(searchParams.get("page"))
      : defaultPage;
  const blogsPerPageParam = Number(searchParams.get("blogsPerPage"))
    ? Number(searchParams.get("blogsPerPage"))
    : defaultBlogsPerPage;
  const navigateString = `/browse?page=${currentPageParam}&blogsPerPage=${blogsPerPageParam}`;

  // Gets multiple blogs on page change and blogsPerPage change.
  useEffect(() => {
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

      try {
        const result = await getMultipleBlogsUtil(currentPage, blogsPerPage);

        // Throws errors if found
        if (result.error) {
          throw result;
        }

        // Stops current execution to prevent race condition
        if (didCancel) {
          return;
        }

        setCurrentPage(result.newCurrentPage);
        setTotalBlogCount(result.totalBlogCount);
        setBlogData(result.multipleBlogs);
      } catch (error) {
        console.log(error);
        setTotalBlogCount(0);
        setBlogsLoading(false);
      } finally {
        // After data is successfully retrieved.
        setBlogsLoading(false);
        setDisplayLoadingCards(false);
        setShowSpinner(false);
        clearTimeout(timeoutId);
      }
    };

    // This variable prevents the race condition of calling the API multiple times when the
    // parameters change.
    // The API will not be called if canceled is set to true by the cleanup function.
    // This also only allows the latest parameters to be used and ignore the earlier calls.
    // If the user clicks forward/backward quickly in the browser history, it will fetch only
    // the data for the last page the user landed on.
    let didCancel = false;

    fetchBlogs();

    return () => {
      didCancel = true;
    };
  }, [currentPage, blogsPerPage]);

  useLayoutEffect(() => {
    document.title = "Browse | Blogga";
  }, []);

  return (
    <div className="relative flex flex-col justify-between min-h-screen overflow-hidden">
      <Navbar />
      <BlogCardsContainer
        blogData={blogData}
        blogsLoading={blogsLoading}
        showSpinner={showSpinner}
        displayLoadingCards={displayLoadingCards}
        totalBlogCount={totalBlogCount}
        blogsPerPage={blogsPerPage}
        setBlogsPerPage={setBlogsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        navigateString={navigateString}
      />
      <Footer />
    </div>
  );
};

export default BrowseBlogsPage;

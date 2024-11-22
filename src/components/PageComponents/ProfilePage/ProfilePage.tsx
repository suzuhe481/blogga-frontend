import { useState, useEffect, useLayoutEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import { DateTime } from "luxon";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import BlogCardsContainer from "../../UI/BlogCardsContainer/BlogCardsContainer";

import { IBlogCard } from "../../UI/BlogCardsContainer/BlogCard";

import getUserBlogsUtil from "../../../helpers/getUserBlogsUtil";
import getUserDraftsUtil from "../../../helpers/getUserDraftsUtil";

interface IAuthorData {
  name: string;
  memberSince: string;
  isLoggedInUser: boolean;
  blogsPublished: number;
  blogDrafts?: number;
}

const ProfilePage = () => {
  // Default values.
  const defaultPage = 1;
  const defaultBlogsPerPage = 5;

  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [userID, setUserID] = useState<string>(() => {
    return id ? id.toString() : "";
  });
  const [authorData, setAuthorData] = useState<IAuthorData | null>(null);
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
  const [userExists, setUserExists] = useState<boolean | null>(null);

  const [blogType, setBlogType] = useState("blogs");

  // This sets up the navigateString that gets passed to the BlogCardsContainer component.
  // This is the template of the URL for this component, which can change based on variables.
  const currentPageParam =
    Number(searchParams.get("page")) > 0
      ? Number(searchParams.get("page"))
      : defaultPage;
  const blogsPerPageParam = Number(searchParams.get("blogsPerPage"))
    ? Number(searchParams.get("blogsPerPage"))
    : defaultBlogsPerPage;
  const navigateString = `/user/${id}/?page=${currentPageParam}&blogsPerPage=${blogsPerPageParam}`;

  const BlogSwitcher = (
    <div className="flex flex-row gap-4 mb-6">
      <button
        onClick={(e) => changeBlogType("blogs")}
        className={`italic hover:bg-slate-400 py-2 px-4 rounded-md ${
          blogType === "blogs" ? "bg-slate-300" : null
        }`}
      >
        My Blogs
      </button>
      <button
        onClick={(e) => changeBlogType("drafts")}
        className={`italic hover:bg-slate-400 py-2 px-4 rounded-md ${
          blogType === "drafts" ? "bg-slate-300" : null
        }`}
      >
        Drafts
      </button>
    </div>
  );

  // Changes the page
  const changeBlogType = (newPage: string) => {
    setBlogType(newPage);
  };

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
      // console.log("empty");
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

      try {
        const result =
          blogType === "blogs"
            ? await getUserBlogsUtil(userID, currentPage, blogsPerPage)
            : await getUserDraftsUtil(userID, currentPage, blogsPerPage);

        if (result.error) {
          throw result;
        }

        // Stops current execution to prevent race condition
        if (didCancel) {
          return;
        }

        setCurrentPage(result.newCurrentPage);
        // setTotalBlogCount(result.blogTypeCount);
        setTotalBlogCount(
          blogType === "blogs"
            ? result.authorData.blogsPublished
            : result.authorData.blogDrafts
        );
        // setTotalBlogCount(result.authorData.blogsPublished);
        setBlogData(result.userBlogs);
        setAuthorData(result.authorData);
        setUserExists(true);
      } catch (error) {
        console.log(error);
        setTotalBlogCount(0);
        setBlogsLoading(false);
        setUserExists(false);
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
  }, [userID, currentPage, blogsPerPage, blogType]);

  useEffect(() => {
    if (authorData !== null) {
      document.title = `${authorData?.name} | Blogga`;
    }
  }, [authorData]);

  return (
    <div className="relative flex flex-col justify-between min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col justify-start items-center w-full min-h-screen">
        {authorData === null ? null : authorData ? (
          <div className="flex flex-col w-[90vw] pt-4 gap-2">
            <h1 className="w-full font-bold text-2xl desktop:text-4xl">
              {authorData.name}
            </h1>
            <div className="flex flex-col gap-1">
              <p className="font-bold">
                Member since:{" "}
                {DateTime.fromISO(authorData.memberSince).toLocaleString(
                  DateTime.DATE_FULL
                )}
              </p>
              <p className="font-bold">
                Blogs created: {authorData.blogsPublished}
              </p>
            </div>
          </div>
        ) : (
          <div>This user does not exist.</div>
        )}
        {authorData?.isLoggedInUser ? BlogSwitcher : null}
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
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;

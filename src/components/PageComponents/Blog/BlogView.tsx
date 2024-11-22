import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";
import { DateTime } from "luxon";
import Modal from "../../UI/Modal/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import getBlogUtil from "../../../helpers/getBlogUtil";
import deleteBlogUtil from "../../../helpers/deleteBlogUtil";
import toggleBlogVisibilityUtil from "../../../helpers/toggleBlogVisibilityUtil";

import { ring } from "ldrs";

export interface Iblog {
  title: string;
  date?: string;
  last_edited?: string;
  blog: string;
  author: string;
  shortId: string;
  authorID: string;
  isBlogOwner: boolean;
  published: boolean;
}

const BlogView = () => {
  ring.register();

  // null - No blog is loaded
  const [blog, setBlog] = useState<Iblog | null>(null);
  const { id = "" } = useParams() as { id: string }; // Fallback value of ""
  const [blogLoading, setBlogLoading] = useState<boolean>(true);
  const [blogError, setBlogError] = useState<boolean>(false);
  const [blogDeleted, setblogDeleted] = useState<boolean>(false);
  const [blogDeletedError, setBlogDeletedError] = useState<boolean>(false);
  const [deleteBlogModalOpen, setDeleteBlogModalOpen] =
    useState<boolean>(false);
  const [toggleBlogModalOpen, setToggleBlogModalOpen] =
    useState<boolean>(false);

  // Text for the Delete Blog modal.
  const DeleteBlogTitle = "Delete Blog";
  const DeleteBlogDescription = "Are you sure you want to delete this blog?";

  // Text for Blog Visibility Modal.
  const ToggleBlogTitle = `${
    !blog?.isBlogOwner
      ? null
      : blog.published
      ? "Unpublish Blog"
      : "Publish Blog"
  }`;
  const ToggleBlogDescription = `Do you want to ${
    !blog?.isBlogOwner ? null : blog.published ? "unpublish" : "publish"
  } this blog? This will ${
    !blog?.isBlogOwner
      ? null
      : blog.published
      ? "save it as a draft and hide it from the public."
      : "make it public."
  }`;

  // Display loading spinner.
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

  // Error element.
  const blogErrorMessage = (
    <div className="flex flex-col items-center">
      <div className="flex flex-col text-center shadow-2xl w-[90vw] desktop:w-[50vw] rounded-xl justify-center gap-2 items-center text-sky-400 text-2xl desktop:text-5xl font-FuzzyBubbles font-bold desktop:gap-0">
        <p>Blog doesn't exist or there was an error.</p>
      </div>
    </div>
  );

  // Blog Deleted message
  const blogDeletedMessage = (
    <div className="flex flex-col items-center">
      <div className="flex flex-col text-center shadow-2xl w-[90vw] desktop:w-[50vw] rounded-xl justify-center gap-2 items-center text-sky-400 text-2xl desktop:text-5xl font-FuzzyBubbles font-bold desktop:gap-0">
        <p>Your blog has been deleted.</p>
      </div>
    </div>
  );

  // Blog Delete Error message
  const blogDeletedErrorMessage = (
    <div className="flex flex-col">
      <ul className="flex flex-col gap-2 text-red-500 font-bold">
        <li>There was a problem deleting the blog.</li>
      </ul>
    </div>
  );

  // Function to decode HTML string of blog from database.
  function decodeHtml(encodedString: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;

    return textarea.value;
  }

  // Opens the delete blog confirmation modal.
  const deleteBlogSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setDeleteBlogModalOpen(true);
  };

  // Closes the delete blog confirmation modal.
  const deleteBlogCancelHandler = () => {
    setDeleteBlogModalOpen(false);
  };

  // Opens the toggle blog visibility modal.
  const openToggleBlogModalHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setToggleBlogModalOpen(true);
  };

  // Closes the toggle blog visibility modal.
  const closeToggleBlogModalHandler = () => {
    setToggleBlogModalOpen(false);
  };

  // Deletes the blog
  async function deleteBlogConfirmHandler() {
    if (blog === null) {
      return;
    }

    setDeleteBlogModalOpen(false);
    setBlogLoading(true);

    const result = await deleteBlogUtil(blog.shortId);

    if (result.error) {
      setBlogDeletedError(true);
      return;
    }

    setblogDeleted(true);
    setBlogLoading(false);
    setBlog(null);
  }

  // Toggles blog visibility
  async function toggleBlogVisibilityHandler() {
    if (blog === null) {
      return;
    }

    setToggleBlogModalOpen(false);
    setBlogLoading(true);

    const result = await toggleBlogVisibilityUtil(blog.shortId);

    if (result.error) {
      console.log(result.error);
      setBlogLoading(false);
      return;
    }

    setBlogLoading(false);

    // Refresh page
    window.location.reload();
  }

  // Retrieves and sets blog data.
  useEffect(() => {
    getBlogUtil(id).then((result) => {
      if (result.error === true) {
        setBlogError(true);
        setBlogLoading(false);
        return;
      }

      const blog: Iblog = result.blog;

      setBlog(blog);
      setBlogLoading(false);
    });
  }, []);

  useLayoutEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Blogga`;
    }
  }, [blog]);

  return (
    <div className="flex flex-col items-center justify-start flex-grow mx-4 desktop:mx-48 py-4">
      {blogLoading ? loadingAnimation : null}
      {blogError ? blogErrorMessage : null}
      {deleteBlogModalOpen ? (
        <Modal
          title={DeleteBlogTitle}
          description={DeleteBlogDescription}
          confirmAction={deleteBlogConfirmHandler}
          cancelAction={deleteBlogCancelHandler}
        />
      ) : null}
      {toggleBlogModalOpen ? (
        <Modal
          title={ToggleBlogTitle}
          description={ToggleBlogDescription}
          confirmAction={toggleBlogVisibilityHandler}
          cancelAction={closeToggleBlogModalHandler}
        />
      ) : null}
      {blogDeleted ? blogDeletedMessage : null}

      {blog ? (
        <div className="flex flex-col w-full gap-4 desktop:w-[60vw]">
          {blog.isBlogOwner && !blog.published ? (
            <div className="font-bold text-2xl text-red-600 italic text-center">
              This blog is unpublished.
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <h1 className="w-full font-bold text-2xl desktop:text-4xl">
              {blog.title}
            </h1>
            <div>
              <a
                href={`/user/${blog.authorID}`}
                className="font-bold text-sky-600 hover:underline"
              >
                {blog.author}
              </a>
              <p>
                {blog.date
                  ? DateTime.fromISO(blog.date).toLocaleString(
                      DateTime.DATE_FULL
                    )
                  : null}
              </p>
              <p className="italic">
                {blog.last_edited
                  ? `Last Edited: ${DateTime.fromISO(
                      blog.last_edited
                    ).toLocaleString(DateTime.DATE_FULL)}`
                  : null}
              </p>
              {blog.isBlogOwner ? (
                <div className="flex flex-row gap-2 my-2 grow basis-0">
                  <a
                    href={`/blog/edit/${id}`}
                    className="flex flex-row justify-center items-center gap-2 border-black border-2 p-2 rounded-xl cursor-pointer hover:bg-slate-300"
                  >
                    Edit
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </a>
                  <button
                    onClick={openToggleBlogModalHandler}
                    className="flex flex-row justify-center items-center gap-2 border-black border-2 p-2 rounded-xl bg-sky-400 hover:bg-sky-600"
                  >
                    {blog.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={deleteBlogSubmitHandler}
                    className="flex flex-row justify-center items-center gap-2 border-black border-2 p-2 rounded-xl bg-red-600 hover:bg-red-800"
                  >
                    Delete
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ) : null}
              {blogDeletedError ? blogDeletedErrorMessage : null}
            </div>
          </div>
          <div
            className="blog"
            dangerouslySetInnerHTML={{
              __html: decodeHtml(DOMPurify.sanitize(blog.blog)),
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default BlogView;

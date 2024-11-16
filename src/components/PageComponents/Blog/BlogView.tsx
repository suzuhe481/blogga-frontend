import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";
import { DateTime } from "luxon";

import getBlogUtil from "../../../helpers/getBlogUtil";

import { ring } from "ldrs";

export interface Iblog {
  title: string;
  date: string;
  post: string;
  author: string;
  shortId: string;
  authorID: string;
}

const BlogView = () => {
  ring.register();

  // null - No blog is loaded
  const [blog, setBlog] = useState<Iblog | null>(null);
  const { id = "" } = useParams() as { id: string }; // Fallback value of ""
  const [blogLoading, setBlogLoading] = useState<boolean>(true);
  const [blogError, setBlogError] = useState<boolean>(false);

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

  // Function to decode HTML string of blog from database.
  function decodeHtml(encodedString: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;

    return textarea.value;
  }

  // Retrieves and sets blog data.
  useEffect(() => {
    getBlogUtil(id).then((result) => {
      if (result.error === true) {
        setBlogError(true);
        setBlogLoading(false);
        return;
      }

      const blog: Iblog = result.post;
      setBlog(blog);
      setBlogLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start flex-grow mx-4 desktop:mx-48 py-4">
      {blogLoading ? loadingAnimation : null}
      {blogError ? blogErrorMessage : null}
      {blog ? (
        <div className="flex flex-col w-full gap-4 desktop:w-[60vw]">
          <div className="flex flex-col gap-1">
            <h1 className="w-full font-bold text-2xl desktop:text-4xl">
              {blog.title}
            </h1>
            <div>
              <a
                href={`/user/${blog.authorID}/blogs`}
                className="font-bold text-sky-600 hover:underline"
              >
                {blog.author}
              </a>
              <p>
                {DateTime.fromISO(blog.date).toLocaleString(DateTime.DATE_FULL)}
              </p>
            </div>
          </div>
          <div
            className="blog"
            dangerouslySetInnerHTML={{
              __html: decodeHtml(DOMPurify.sanitize(blog.post)),
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default BlogView;

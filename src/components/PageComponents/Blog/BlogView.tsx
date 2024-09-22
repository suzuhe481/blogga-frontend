import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";
import { DateTime } from "luxon";

import getBlogUtil from "../../../helpers/getBlogUtil";

export interface Iblog {
  title: string;
  date: string;
  blog: string;
}

const BlogView = () => {
  // false = Blog could not be loaded.
  // null = blog is being fetched
  const [blog, setBlog] = useState<Iblog | false | null>(null);
  const { id } = useParams();

  // Loading and error elements for blog.
  const BlogLoading = <div>Blog loading...</div>;
  const BlogError = <div>Blog could not load</div>;

  // The final blog view.
  // The blog state, determines the view show..
  const BlogView = blog ? (
    <>
      <h1 className="w-full">{blog.title}</h1>
      <p>{DateTime.fromISO(blog.date).toLocaleString(DateTime.DATETIME_MED)}</p>
      <p>{blog.date}</p>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{
          __html: decodeHtml(DOMPurify.sanitize(blog.blog)),
        }}
      />
    </>
  ) : !blog ? (
    BlogError
  ) : (
    BlogLoading
  );

  // Function to decode HTML string of blog from database.
  function decodeHtml(encodedString: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;

    return textarea.value;
  }

  // Retrieves and sets user data for navbar.
  useEffect(() => {
    getBlogUtil(id).then((result) => {
      if (result.error === true) {
        setBlog(false);
        return;
      }

      const blog: Iblog = {
        title: result.post.title,
        date: result.post.date,
        blog: result.post.post,
      };

      setBlog(blog);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start flex-grow mx-4 desktop:mx-48 py-4">
      {BlogView}
    </div>
  );
};

export default BlogView;

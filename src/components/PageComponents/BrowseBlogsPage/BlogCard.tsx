import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

import DOMPurify from "dompurify";
import { DateTime } from "luxon";

export interface IBlogCard {
  title: string;
  author: string;
  date: string;
  shortId: string;
  authorID: string;
}

const BlogCard = ({ title, author, date, shortId, authorID }: IBlogCard) => {
  // Function to decode HTML string of blog from database to user friendly text.
  function decodeHtml(encodedString: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;

    return textarea.value;
  }

  const author_name = `${author.first_name} ${author.last_name}`;

  return (
    <a
      href={`/blog/${shortId}`}
      className="flex w-full shadow-xl rounded-xl overflow-hidden"
    >
      <div className="group flex flex-col w-full cursor-pointer">
        <div className="flex justify-center bg-sky-400 w-[90vw] lg:w-[30rem]">
          <img
            src={LOGO_WHITE}
            className="h-32 object-contain aspect-auto my-4"
          />
        </div>
        <div className="px-2">
          <div
            dangerouslySetInnerHTML={{
              __html: decodeHtml(DOMPurify.sanitize(title)),
            }}
            className="mb-2 group-hover:underline font-bold"
          />
          <div className="flex flex-row gap-4 mb-2">
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(DOMPurify.sanitize(author_name)),
              }}
            />
            <div>|</div>
            <div>
              {DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;

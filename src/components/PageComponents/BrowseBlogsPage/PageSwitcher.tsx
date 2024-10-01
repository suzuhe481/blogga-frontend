interface IpageData {
  totalBlogCount: number;
  currentPage: number;
  blogsPerPage: number;
  setCurrentPage: (value: number) => void;
  blogsLoading: boolean;
}

const PageSwitcher = ({
  totalBlogCount,
  currentPage,
  blogsPerPage,
  setCurrentPage,
  blogsLoading,
}: IpageData) => {
  const pageBuffer = 1;
  const totalPagesInt = Math.ceil(totalBlogCount / blogsPerPage);
  const totalPagesArr = Array(totalPagesInt)
    .fill(undefined)
    .map((x, index) => index + 1);

  // Flags for tracking if first/second set of ellipsis are added.
  var firstEllipsisAdded = false;
  var secondEllipsisAdded = false;

  const pageArray: (number | string)[] = []; // Initializing empty array.

  // Creating the array containing current pages to be viewed.
  // NOT HTML elements.
  totalPagesArr.forEach((page) => {
    // Always add first page
    if (page === 1) {
      pageArray.push(page);
    }
    // Always add last page
    else if (page == totalPagesInt) {
      pageArray.push(page);
    }
    // When page is outside of lower buffer limit, add the first set of ellipsis.
    else if (page < currentPage - pageBuffer) {
      if (firstEllipsisAdded) {
        return;
      }

      pageArray.push("...");
      firstEllipsisAdded = true;
    }
    // When page is within buffer, add the page.
    else if (
      page >= currentPage - pageBuffer &&
      page <= currentPage + pageBuffer
    ) {
      pageArray.push(page);
    }
    // When page is outside the upper buffer limit, add the second set of ellipsis.
    else if (page > currentPage + pageBuffer) {
      if (secondEllipsisAdded) {
        return;
      }

      pageArray.push("...");
      secondEllipsisAdded = true;
    }
  });

  // Creating the array of HTML elements based on pageArray.
  const pageElementArray =
    totalPagesInt === 0
      ? null
      : pageArray.map((value, index) => {
          if (Number(value) === Number(currentPage)) {
            return (
              <div
                key={index}
                onClick={clickHandler}
                className={`p-2 bg-sky-400 text-white border-2 border-sky-400 ${
                  blogsLoading ? "cursor-not-allowed" : "cursor-pointer"
                } m-2`}
              >
                {value}
              </div>
            );
          } else if (value === "...") {
            return (
              <div
                key={index}
                onClick={clickHandler}
                className={`p-2 m-2 ${
                  blogsLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {value}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                onClick={clickHandler}
                className={`p-2 m-2 border-sky-400 border-2 hover:bg-sky-400 hover:text-white ${
                  blogsLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {value}
              </div>
            );
          }
        });

  // Switches current page.
  function clickHandler(e: React.MouseEvent<HTMLDivElement>) {
    // Stop if blogs are currently loading.
    if (blogsLoading) {
      return;
    }

    const newPage = e.currentTarget.innerText;

    if (newPage === "...") {
      return;
    } else {
      setCurrentPage(Number(newPage));
    }
  }

  return <div className="flex flex-row">{pageElementArray}</div>;
};

export default PageSwitcher;

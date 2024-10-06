interface IpageData {
  totalBlogCount: number;
  currentPage: number;
  blogsPerPage: number;
  setCurrentPage: (value: number) => void;
  blogsLoading: boolean;
}

// Creates an array of the buffer pages which appear around the current page.
function createBufferArray(
  currentPage: number,
  pageBuffer: number,
  totalPagesInt: number
) {
  // Create the array of buffer pages.
  const bufferArr = [];
  for (var i = currentPage - pageBuffer; i <= currentPage + pageBuffer; i++) {
    bufferArr.push(i);
  }

  const bufferFiltered = bufferArr.filter((page) => {
    return page > 1 && page < totalPagesInt;
  });

  return bufferFiltered;
}

// Creates the full array of visible pages with ellipsis.
// Updates the given pagesArray variable.
function createPagesArray(
  pagesArray: (number | string)[] = [],
  bufferArray: number[],
  totalPagesInt: number
) {
  // Add first page.
  pagesArray.push(1);

  // If buffer isn't empty
  if (bufferArray.length !== 0) {
    // Add first set of ellipsis, if needed.
    if (2 !== bufferArray[0]) {
      pagesArray.push("...");
    }

    // Add buffer to pageArr.
    bufferArray.forEach((page: number) => {
      pagesArray.push(page);
    });

    // Add second set of ellipsis, if needed.
    if (totalPagesInt - 1 !== bufferArray[bufferArray.length - 1]) {
      pagesArray.push("...");
    }
    // Add last page.
    pagesArray.push(totalPagesInt);
  }
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

  // Creates a buffer array.
  const bufferArray = createBufferArray(currentPage, pageBuffer, totalPagesInt);

  const pagesArray: (number | string)[] = []; // Initializing empty array.
  createPagesArray(pagesArray, bufferArray, totalPagesInt);

  // Creating the array of HTML elements based on pageArray.
  const pageElementArray =
    totalPagesInt === 0
      ? null
      : pagesArray.map((value, index) => {
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

const getUserBlogsUtil = async (
  userID: string,
  currentPage: number,
  blogsPerPage: number
) => {
  const URL = `${
    import.meta.env.VITE_DEV_BACKEND_URL
  }/users/posts/${userID}?currentPage=${currentPage}&blogsPerPage=${blogsPerPage}`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  return fetch(URL, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //   console.log(json);
      return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: "Failed to connect to server",
      };

      //   console.log(error);
      return errorMessage;
    });
};

export default getUserBlogsUtil;

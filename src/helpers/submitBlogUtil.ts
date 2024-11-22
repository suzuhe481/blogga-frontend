const submitBlogUtil = (blogData: {
  title: string;
  blog: string;
  draft: boolean;
}) => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/blogs`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  const body = JSON.stringify(blogData);

  return fetch(URL, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: body,
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

export default submitBlogUtil;

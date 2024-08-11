const logoutUtil = (event: any) => {
  event.preventDefault();

  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/log-out`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  return fetch(URL, {
    method: "POST",
    headers: headers,
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: "Failed to fetch from server",
        msg2: error,
      };
      return errorMessage;
    });
};

export default logoutUtil;

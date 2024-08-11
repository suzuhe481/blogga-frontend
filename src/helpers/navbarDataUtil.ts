// Example function to get data from the Node.js/Express backend from the /sample route.
const navbarDataUtil = async () => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users/name`;

  // Token will be null if not set.
  // const token = localStorage.getItem("token");

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
      return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: error,
      };

      return errorMessage;
    });
};

export default navbarDataUtil;

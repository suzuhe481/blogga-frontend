const sendVerificationEmailUtil = () => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/send-verification`;

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
        message: ["Failed to connect."],
      };
      console.log(error);
      return errorMessage;
    });
};

export default sendVerificationEmailUtil;

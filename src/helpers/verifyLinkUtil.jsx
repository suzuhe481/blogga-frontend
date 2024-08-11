// Verifies a jwt token recieved through a verification email.
const verifyLinkUtil = async (token) => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/verify`;

  // Token Format is a string that begins with "Bearer"
  // and a single whitespace between it and the token.
  const tokenToSend = "Bearer " + token;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: tokenToSend,
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

export default verifyLinkUtil;

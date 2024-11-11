export const isEmailAvailable = (email: string) => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/check-email/${email}`;

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
      const errorMessage = [
        {
          error: true,
          msg: "Failed to get data from server",
        },
      ];
      console.log(error);
      return errorMessage;
    });
};

export const isUsernameAvailable = (username: string) => {
  const URL = `${
    import.meta.env.VITE_DEV_BACKEND_URL
  }/check-username/${username}`;

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
      const errorMessage = [
        {
          error: true,
          msg: "Failed to get data from server",
        },
      ];
      console.log(error);
      return errorMessage;
    });
};

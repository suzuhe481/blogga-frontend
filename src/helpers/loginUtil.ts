const loginUtil = (event: any) => {
  event.preventDefault();

  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/log-in`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  // Body values from form.
  const email = event.target[0].value;
  const password = event.target[1].value;

  const body = JSON.stringify({ email, password });

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
      return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: "Failed to get data from server",
      };
      console.log(error);
      return errorMessage;
    });
};

export default loginUtil;

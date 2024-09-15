// import { login } from "./localStorageUtil";

const signUpUtil = (event: any) => {
  event.preventDefault();

  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  /* How the User object is defined in the backend.
  
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    account_created_date: date,
    status: "Member",
  });

  */

  // Body values from form.
  const email = event.target[0].value;
  const password = event.target[1].value;
  const first_name = event.target[4].value;
  const last_name = event.target[5].value;
  const username = event.target[6].value;

  const body = JSON.stringify({
    email,
    password,
    first_name,
    last_name,
    username,
  });

  return fetch(URL, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      const errorMessage = { error: true, message: "Failed to sign in" };
      console.log(error);
      return errorMessage;
    });
};

export default signUpUtil;

// import { login } from "./localStorageUtil";

const signUpUtil = (event) => {
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
    account_created_date: date,
    status: "Member",
  });

  */

  // Body values from form.
  const first_name = event.target[0].value;
  const last_name = event.target[1].value;
  const email = event.target[2].value;
  const password = event.target[3].value;

  const body = JSON.stringify({ first_name, last_name, email, password });

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
      const errorMessage = "Failed to sign in";
      console.log(error);
      return errorMessage;
    });
};

export default signUpUtil;

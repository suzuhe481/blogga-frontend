import { DateTime } from "luxon";

// Response Object shape
/*
Object = {
  success: true,
  user: {},
  token: "Bearer thetokenstring",
  expiresIn: "1 day",
};
*/

// Saves items to local storage.
export const login = (response) => {
  const expiresAmount = response.expiresIn.split(" ")[0];
  // const expiresType = response.expiresIn.split(" ")[1];

  // expiresAt will be in Unix format
  const expiresAt = DateTime.now()
    .plus({ days: expiresAmount })
    .toUnixInteger();

  localStorage.setItem("token", response.token);
  localStorage.setItem("expiresAt", expiresAt);

  // Redirects user to home page.
  window.location.href = "/";
};

// Deletes login information from local storage.
export const logout = () => {
  // Redirects user to home page.
  window.location.href = "/";

  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
};

// Gets the expiration date of the jwt token in local storage.
const getExpiration = () => {
  const expiration = localStorage.getItem("expiresAt");

  return expiration;
};

// Checks whether user is logged in.
// Checks if local storage items are expired.
export const isLoggedIn = () => {
  return getExpiration() > DateTime.now().toUnixInteger() ? true : false;
};

// Checks is user is logged out.
export const isLoggedOut = () => {
  return !isLoggedIn();
};

/* FILE NOT USED ANYMORE */

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
export const login = (/*response*/) => {
  // console.log(response);
  // const expiresAmount = response.expiresIn.split(" ")[0];
  // const expiresType = response.expiresIn.split(" ")[1];
  // expiresAt will be in Unix format
  // const expiresAt = DateTime.now()
  //   .plus({ days: expiresAmount })
  //   .toUnixInteger();
  // const expiresAt = DateTime.now()
  //   .plus({ minutes: expiresAmount })
  //   .toUnixInteger();
  // localStorage.setItem("token", response.token);
  // localStorage.setItem("expiresAt", expiresAt);
  // Redirects user to home page.
  // window.location.href = "/";
};

// Deletes login information from local storage.
export const logout = () => {
  // console.log("deleting from localstorage");
  // localStorage.removeItem("token");
  // localStorage.removeItem("expiresAt");
  // Redirects user to home page.
  // window.location.href = "/";
};

// Gets the expiration date of the jwt token in local storage.
export const getExpiration = () => {
  const expiration = localStorage.getItem("expiresAt");

  return expiration;
};

// Checks whether user is logged in.
// Checks if local storage items are expired.
export const isLoggedIn = () => {
  // console.log(`now: ${DateTime.now().toUnixInteger()}`);
  // console.log(`expires at: ${getExpiration()}`);
  // console.log(
  //   `user info is ${
  //     DateTime.now().toUnixInteger() < getExpiration()
  //       ? "logged in / not expired"
  //       : "expired / not loggged in"
  //   }`
  // );

  return DateTime.now().toUnixInteger() < getExpiration() ? true : false;
};

// Checks is user is logged out.
export const isLoggedOut = () => {
  return !isLoggedIn();
};

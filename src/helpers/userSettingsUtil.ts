// Retrieves the user's current settings.
export const getUserSettingsUtil = () => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users/settings`;

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
      // console.log(json);
      return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: "Failed to connect to server",
      };

      //   console.log(error);
      return errorMessage;
    });
};

import {
  IPreferences,
  ISettings,
} from "../components/PageComponents/UserSettingsPage/PublicProfileSettings";

// Updates the user's settings.
export const updateUserSettingsUtil = (newSettings: ISettingsProps) => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users/settings`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  const body = JSON.stringify(newSettings);

  return fetch(URL, {
    method: "PUT",
    headers: headers,
    credentials: "include",
    body: body,
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //   console.log(json);
      return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: "Failed to connect to server",
      };

      //   console.log(error);
      return errorMessage;
    });
};

// Deletes the user's profile.
export const deleteUserProfileUtil = (userID: string) => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${userID}`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  return fetch(URL, {
    method: "DELETE",
    headers: headers,
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //   console.log(json);
      return json;
    })
    .catch((error) => {
      const errorMessage = {
        error: true,
        msg: "Failed to connect to server",
      };

      //   console.log(error);
      return errorMessage;
    });
};

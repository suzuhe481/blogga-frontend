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
export const updateUserSettingsUtil = (
  newPreferences: IPreferences,
  newSettings: ISettings
) => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users/settings`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  const body = JSON.stringify({ newPreferences, newSettings });

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

interface IEmailProps {
  email: string;
  emailPassword: string;
}

// Updates the user's email.
export const updateEmailUtil = (newEmail: IEmailProps) => {
  const URL = `${
    import.meta.env.VITE_DEV_BACKEND_URL
  }/users/settings-update-email`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  const body = JSON.stringify(newEmail);

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

interface IPasswordProps {
  oldPassword: string;
  newPassword: string;
}

// Updates the user's email.
export const updatePasswordUtil = (newPassword: IPasswordProps) => {
  const URL = `${
    import.meta.env.VITE_DEV_BACKEND_URL
  }/users/settings-update-password`;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  const body = JSON.stringify(newPassword);

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
export const deleteUserProfileUtil = () => {
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users`;

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

// Checks if the 2 given passwords are equal.
// Returns boolean.
export const isPasswordsEqual = (password: string, confirmPassword: string) => {
  // If either password field is empty and sets errors.
  if (password === "" || confirmPassword === "") {
    return false;
  }

  // Checks for matching passwords and sets errors.
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};

// Checks if email is in valid email format using regex.
// Returns boolean
export const isValidEmail = (email: string) => {
  // Checks if email is empty.
  if (email === "") {
    return false;
  }

  // Email regex.
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false) {
    return false;
  }

  return true;
};

// Checks if username is valid using regex.
// Valid is...
// -Minimum of 4 characters.
// -Alphanumerical characters.
// -No spaces.
// Returns boolean
export const isValidUsername = (username: string) => {
  // Checks if email is empty.
  if (username === "") {
    return false;
  }

  // Username regex.
  const reg = /^[a-zA-Z0-9]{4,}$/;

  if (reg.test(username) == false) {
    return false;
  }

  return true;
};

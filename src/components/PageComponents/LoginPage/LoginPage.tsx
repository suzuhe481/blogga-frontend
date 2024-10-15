import React, { useEffect, useState } from "react";

import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import Footer from "../Welcome/Footer";

import loginUtil from "../../../helpers/loginUtil";
import signUpUtil from "../../../helpers/signupUtil";

const LoginPage = () => {
  const [onLogin, setOnLogin] = useState<boolean>(true);

  const [loginErrors, setLoginErrors] = useState<Array<string>>([]);
  const [loginSubmitted, setLoginSubmitted] = useState<boolean>(false);

  const [registerErrors, setRegisterErrors] = useState<Array<string>>([]);
  const [registerSubmitted, setRegisterSubmitted] = useState<boolean>(false);

  const [signinFormData, setSigninFormData] = useState({
    email: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  const handleChangeSigninForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setSigninFormData({
      ...signinFormData,
      [name]: value,
    });
  };

  const handleChangeRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  // Controls hash value that appears in the URL based on form selected.
  const handleToggleForm = () => {
    setOnLogin((prev) => {
      const newState = !prev;

      window.location.hash = newState ? "#login" : "#register";

      return newState;
    });
  };

  async function loginHandler(event: React.FormEvent) {
    const result = await loginUtil(event); // Call login to server.
    setLoginErrors([]);
    setLoginSubmitted(true);

    // Simulates a 1 second load time.
    setTimeout(() => {
      setLoginSubmitted(false);

      // NOTE: Login: result.message is a single string receieved from the backend.
      if (result.error) {
        setLoginErrors(result.message);
        return;
      }

      // Redirects user to home page.
      window.location.href = "/";
    }, 1000);
  }


  // Sets onLogin state on page load based on hash.
  // Adds event listener to detect future hash changes.
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#register") {
        setOnLogin(false);
      } else {
        setOnLogin(true);
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <SignInForm
        onLogin={onLogin}
        handleToggleForm={handleToggleForm}
        handleChangeSigninForm={handleChangeSigninForm}
      />
      <RegisterForm
        onLogin={onLogin}
        handleToggleForm={handleToggleForm}
        handleChangeRegisterForm={handleChangeRegisterForm}
      />
      <Footer />
    </div>
  );
};

export default LoginPage;

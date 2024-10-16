import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

import LOGO from "../../../assets/images/LOGO_BLUE.png";

import { isPasswordsEqual, isValidEmail } from "../../../helpers/formUtil";

import "ldrs/bouncy";

interface IRegisterPageProps {
  onLogin: boolean;
  handleToggleForm: () => void;
  handleChangeRegisterForm: React.ChangeEventHandler<HTMLInputElement>;
  registerHandler: (e: React.FormEvent) => void;
  registerSubmitted: boolean;
  registerErrors: Array<string>;
}

const RegisterForm = ({
  onLogin,
  handleToggleForm,
  handleChangeRegisterForm,
  registerHandler,
  registerSubmitted,
  registerErrors,
}: IRegisterPageProps) => {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  // Loading animation for submit button.
  const SubmitLoadingAnimation = (
    <l-bouncy size="30" speed="1.75" color="white" />
  );

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeRegisterForm(e);

    const { value } = e.target as HTMLInputElement;

    setEmail(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeRegisterForm(e);

    const { value } = e.target as HTMLInputElement;

    setPassword(value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChangeRegisterForm(e);

    const { value } = e.target as HTMLInputElement;

    setConfirmPassword(value);
  };

  // Handles setting errors for email input.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // Hides "Email is not in a valid format" error when email field is empty.
      if (email.length === 0) {
        setIsEmailValid(true);
        return;
      }

      if (isValidEmail(email)) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [email]);

  // Handles setting errors for password input.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // Ignores first page load
      if (password.length === 0 && passwordValid === null) {
        return;
      }

      if (password.length >= 8) {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [password]);

  // Handles setting errors for confirm password input.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // Hides "Passwords do not match" error when both password fields are empty.
      if (password.length === 0 && confirmPassword.length === 0) {
        setPasswordsMatch(true);
        return;
      }

      // Ignore first page load
      if (password.length === 0 || confirmPassword.length === 0) {
        return;
      }

      if (isPasswordsEqual(password, confirmPassword)) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [password, confirmPassword]);

  return (
    <div
      className={`animate-fadeInSlideUp flex flex-col justify-center items-center mt-[2.5rem] mx-auto mb-0 max-w-[90vw] desktop:max-w-[636px] ${
        onLogin ? "hidden" : ""
      }`}
    >
      <div className="min-w-[90vw] flex justify-center items-center mb-4">
        <a
          href="/"
          className="inline-flex justify-center items-center flex-none"
        >
          <img src={LOGO} className="max-h-24" />
        </a>
      </div>
      <div className="w-[368px] flex flex-row justify-center items-center mb-4">
        <div className="flex-1">
          <button
            onClick={handleToggleForm}
            className="w-full border-slate-400 border-2 p-2 rounded-md  hover:bg-sky-50 hover:shadow-[0_0_5px_rgba(56,189,248,0.8)]"
          >
            Sign In
          </button>
        </div>
        <div className="w-[1px] h-[78px] bg-slate-400 mx-4" />
        <div className="flex-1">
          <button className="w-full border-sky-400 border-2 p-2 rounded-md shadow-[0_0_5px_rgba(56,189,248,0.8)]">
            Create Account
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center mb-8">
        <div className="w-full text-center font-bold font-FuzzyBubbles text-4xl mb-6">
          Create Account
        </div>
        <form onSubmit={registerHandler} className="w-full">
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              required
              onChange={handleChangeEmail}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />

            <div
              className={`flex flex-col my-1 text-red-500 ${
                isEmailValid ? "hidden" : ""
              }`}
            >
              <div className="flex flex-row items-center gap-2 font-bold">
                <FontAwesomeIcon
                  icon={faExclamation}
                  className="border-2  p-1 rounded-full w-4 h-4 border-red-500"
                />
                <div>Email is not in a valid format.</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mb-6">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChangePassword}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />

            <div className="flex flex-col text-slate-500">
              <div>Your password must contain:</div>
              <div
                className={`flex flex-row items-center gap-2 font-bold ${
                  passwordValid === null
                    ? "text-slate-500"
                    : passwordValid
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <FontAwesomeIcon
                  icon={faExclamation}
                  className={`border-2  p-1 rounded-full w-4 h-4 ${
                    passwordValid === null
                      ? "border-slate-500"
                      : passwordValid
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
                />
                <div>8 characters</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mb-6">
            <label htmlFor="confirm_password" className="mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              required
              onChange={handleChangeConfirmPassword}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />

            <div
              className={`flex flex-col my-1 text-red-500 ${
                passwordsMatch || passwordsMatch === null ? "hidden" : ""
              }`}
            >
              <div className="flex flex-row items-center gap-2 font-bold">
                <FontAwesomeIcon
                  icon={faExclamation}
                  className="border-2  p-1 rounded-full w-4 h-4 border-red-500"
                />
                <div>Passwords do not match.</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mb-6">
            <label htmlFor="first_name" className="mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              required
              onChange={handleChangeRegisterForm}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <label htmlFor="last_name" className="mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              required
              onChange={handleChangeRegisterForm}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <label htmlFor="username" className="mb-1">
              Username (Display name)
            </label>
            <input
              type="text"
              name="username"
              required
              onChange={handleChangeRegisterForm}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <button
              type="submit"
              className="rounded-md bg-sky-400 hover:bg-sky-600 text-white font-bold py-3 px-4"
            >
              {registerSubmitted ? SubmitLoadingAnimation : "Create Account"}
            </button>
          </div>

          <div className="text-red-600">
            {registerErrors.map((error, index) => {
              return (
                <li key={index} className="list-disc">
                  {error}
                </li>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

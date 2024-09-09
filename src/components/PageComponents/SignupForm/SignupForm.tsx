import { useState, useRef } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
// import styles from "./SignupForm.module.scss";

import LOGO_BLUE from "../../../assets/images/LOGO_BLUE.png";

import signUpUtil from "../../../helpers/signupUtil";

const SignupForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formPage, setFormPage] = useState(0);

  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  // Sets the left margin based on the current form page to animate slide appropriately.
  var slidingFormClasses =
    "flex justify-center items-center w-full transition-all duration-300 ";
  slidingFormClasses += `ml-[-${formPage * 100}%]`;
  // slidingFormClasses += `ml-[-100%]`;

  const passwordOnChangeHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const event = e.target as HTMLInputElement;
    setPassword(event.value);
  };

  const confirmPasswordOnChangeHandler = (e: React.KeyboardEvent) => {
    const event = e.target as HTMLInputElement;

    setConfirmPassword(event.value);
  };

  const isPasswordsEqual = () => {
    if (confirmPasswordInputRef.current === null) {
      return;
    }

    // Changes password input's border color to black/red if there is error.
    if (password === confirmPassword) {
      confirmPasswordInputRef.current.style.borderColor = "#ccc";

      return true;
    } else {
      confirmPasswordInputRef.current.style.borderColor = "red";

      return false;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isPasswordsEqual()) {
      signUpUtil(e);
    } else {
      console.log("form has errors");
    }
  };

  const nextPage = () => {
    setFormPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setFormPage((prev) => prev - 1);
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col py-24 desktop:pt-36 justify-start items-center text-xl font-mono desktop:min-h-screen w-full bg-sky-400">
        <div className="w-[90vw] desktop:w-[40rem] rounded-lg p-4 desktop:py-12 bg-white overflow-hidden">
          <div className="flex flex-col justify-center items-center gap-4 py-4 desktop:p-0 text-4xl font-bold">
            <div className="w-1/2">
              <img
                src={LOGO_BLUE}
                className="h-full object-contain aspect-auto"
              />
            </div>
            <h1>Sign Up</h1>
          </div>

          <div className="w-full overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-12 w-[200%] "
            >
              <div className={slidingFormClasses}>
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className="text-4xl font-bold">Login Info</h1>
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      required
                      className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      required
                      onKeyUp={passwordOnChangeHandler}
                      className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirm_password">Confirm password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      required
                      onKeyUp={confirmPasswordOnChangeHandler}
                      ref={confirmPasswordInputRef}
                      className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
                    />
                  </div>
                  <div className="flex flex-row justify-center items-center h-16 w-full">
                    <button
                      type="button"
                      onClick={nextPage}
                      className="h-full w-full bg-sky-400"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className="text-4xl font-bold">Profile Info</h1>
                  <div className="flex flex-col">
                    <label htmlFor="first_name">First name</label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="last_name">Last name</label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="username">Username (@ Display name)</label>
                    <input
                      type="text"
                      name="username"
                      required
                      className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
                    />
                  </div>
                  <div className="flex flex-row justify-center items-center h-16 w-full gap-2">
                    <button
                      type="button"
                      onClick={prevPage}
                      className="h-full w-full bg-sky-400"
                    >
                      Previous
                    </button>
                    <button type="submit" className="h-full w-full bg-sky-400">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;

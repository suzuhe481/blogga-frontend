import { useState } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
// import styles from "./LoginForm.module.scss";

import loginUtil from "../../../helpers/loginUtil";

import { bouncy } from "ldrs";

const LoginForm = () => {
  bouncy.register();

  const [formSubmitted, setFormSubmitted] = useState(false);

  async function loginHandler(event: any) {
    setFormSubmitted(true);
    const result = await loginUtil(event); // Call login to server.

    setTimeout(() => {
      if (result.error) {
        setFormSubmitted(false);
        console.log(result.msg);
        return;
      }

      // Redirects user to home page.
      window.location.href = "/";
    }, 1000);
  }

  return (
    <div>
      <Navbar />

      <div className="flex flex-col pt-36 justify-start items-center text-xl font-mono h-screen bg-sky-400">
        <form
          onSubmit={loginHandler}
          className="flex flex-col gap-4 border-2 border-black p-8 desktop:py-12 bg-white"
        >
          <div className="flex justify-center items-center text-4xl font-bold my-8">
            <h1>Login</h1>
          </div>

          <div className="flex flex-col gap-4 desktop:w-[40vw]">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                required
                className="border-2 border-black p-1"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                required
                className="border-2 border-black p-1"
              />
            </div>
            <div className="form-submit">
              <button
                type="submit"
                className="p-2 border-2 border-sky-400 min-w-36 text-sky-400 hover:bg-sky-400 hover:text-white rounded-lg"
              >
                {formSubmitted ? (
                  <l-bouncy size="30" speed="1.75" color="white"></l-bouncy>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default LoginForm;

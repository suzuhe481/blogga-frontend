import { useState } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";

import LOGO_BLUE from "../../../assets/images/LOGO_BLUE.png";

import loginUtil from "../../../helpers/loginUtil";

import { bouncy } from "ldrs";

const LoginForm = () => {
  bouncy.register();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

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

  // Sets state when mouse enters login button
  function loginMouseEnterHandler() {
    setSubmitHovered(true);
  }

  // Sets state when mouse leaves login button
  function loginMouseLeaveHandler() {
    setSubmitHovered(false);
  }

  // White - When Login button is hovered after form submit, animation is white.
  const HoveredAnimation = <l-bouncy size="30" speed="1.75" color="white" />;

  // Blue - When Login button is NOT hovered after form submit, animation is blue.
  const UnHoveredAnimation = (
    <l-bouncy size="30" speed="1.75" color="#00A9FF" />
  );

  return (
    <div>
      <Navbar />

      <div className="flex flex-col py-24 desktop:pt-36 justify-start items-center text-xl font-mono desktop:min-h-screen w-full bg-sky-400">
        <form
          onSubmit={loginHandler}
          className="flex flex-col items-center gap-12 w-[90vw] desktop:w-[40rem] border-2 border-black p-4 desktop:py-12 bg-white"
        >
          <div className="flex flex-col justify-center items-center gap-4 py-4 desktop:p-0 text-4xl font-bold">
            <div className="w-1/2">
              <img
                src={LOGO_BLUE}
                className="h-full object-contain aspect-auto"
              />
            </div>
            <h1>Log In</h1>
          </div>

          <div className="flex flex-col gap-4 desktop:w-[90%]">
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
                className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-8">
              <button
                type="submit"
                onMouseEnter={loginMouseEnterHandler}
                onMouseLeave={loginMouseLeaveHandler}
                className="p-2 border-2 border-sky-400 desktop:min-w-36 text-sky-400 hover:bg-sky-400 hover:text-white rounded-lg"
              >
                {formSubmitted
                  ? submitHovered
                    ? HoveredAnimation
                    : UnHoveredAnimation
                  : "Log In"}
              </button>
              <a
                href="/signup"
                className="flex justify-start items-center cursor"
              >
                Don't have an account? Create one here!
              </a>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default LoginForm;

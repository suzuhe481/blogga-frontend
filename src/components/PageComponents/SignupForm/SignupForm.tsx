import { useState, FormEvent } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";

import FormPageOne from "./FormPageOne";
import FormPageTwo from "./FormPageTwo";
import FormPageThree from "./FormPageThree";

import LOGO_BLUE from "../../../assets/images/LOGO_BLUE.png";

import signUpUtil from "../../../helpers/signupUtil";

const SignupForm = () => {
  const [formPage, setFormPage] = useState(0);

  // Controls form button's disabled property to prevent quick, repeated button presses
  // from breaking form.
  const [isFormPageAnimated, setIsFormPageAnimated] = useState(false);

  // Used in inline css due to difficulty of implementing dynamically in Tailwind.
  // Sets the left margin based on the current form page to animate slide appropriately.
  // -100 * (number of forms - 1) / totalforms
  const defaultMarginValue = (-100 * 2) / 3; // -66.6% or 2/3 of -100
  const inlineMarginLeft = { marginLeft: `${formPage * defaultMarginValue}%` };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await signUpUtil(e);
    // If signup successful,
    if (result === "good") {
      // Go to final success page
      nextPage();
    }
  };

  // Handles enter press while an input is focused to submit form.
  const handleEnterPress = (e: any) => {
    if (e.key === "Enter" && isInputFocused) {
      e.preventDefault();

      if (formPage === 1) {
        // This form event is used to pass the form to handleSubmit()
        const syntheticFormEvent = {
          preventDefault: () => {},
        } as FormEvent<HTMLFormElement>;
        handleSubmit(syntheticFormEvent);
      }
    }
  };

  // Increments formPage by 1.
  // Set setIsFormPageAnimated to true.
  const nextPage = () => {
    if (formPage < 2) {
      setFormPage((prev) => prev + 1);
      setIsFormPageAnimated(true);
    }
  };

  // Decrements formPage by 1.
  // Set setIsFormPageAnimated to true.
  const prevPage = () => {
    if (formPage > 0) {
      setFormPage((prev) => prev - 1);
      setIsFormPageAnimated(true);
    }
  };

  // Runs when sliding transition of form changes ends.
  const pageAnimationTransitionEnd = () => {
    setIsFormPageAnimated(false);
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col py-24 desktop:pt-36 justify-start items-center text-xl font-mono desktop:min-h-screen w-full bg-sky-400">
        <div className="w-[90vw] desktop:w-[40rem] rounded-lg p-4 desktop:py-12 bg-white">
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
              className="flex flex-col justify-center items-center gap-12 w-[300%] "
            >
              <div
                className="flex justify-center items-center w-full transition-all duration-300"
                style={inlineMarginLeft}
                onTransitionEnd={pageAnimationTransitionEnd}
              >
                <div className="flex flex-col w-1/3 gap-4 mx-1">
                  <FormPageOne
                    nextPage={nextPage}
                    isFormPageAnimated={isFormPageAnimated}
                    setIsInputFocued={setIsInputFocued}
                  />
                </div>

                <div className="flex flex-col w-1/3 gap-4 mx-1">
                  <FormPageTwo
                    prevPage={prevPage}
                    isFormPageAnimated={isFormPageAnimated}
                    setIsInputFocued={setIsInputFocued}
                  />
                </div>

                <div className="flex flex-col w-1/3 gap-4 mx-1">
                  <FormPageThree />
                </div>
              </div>
            </form>
          </div>
          <a href="/login" className="flex justify-start items-center cursor">
            Already have an account? Log in here!
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;

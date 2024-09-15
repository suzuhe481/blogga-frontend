import { useState, useRef, FormEvent } from "react";

interface FormPageOneProps {
  nextPage: () => void;
  isFormPageAnimated: boolean;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormPageOne = ({
  nextPage = () => {},
  isFormPageAnimated,
  setIsInputFocused,
}: FormPageOneProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Array<string>>([]);

  // Styles for email input.
  var EmailInputStyles =
    "shadow-black shadow-sm border-4 p-1 focus:border-black outline-none rounded-lg ";
  EmailInputStyles += emailError ? "border-red-700" : "border-transparent";

  // Styles for confirm password input.
  var ConfirmPasswordInputStyles =
    "shadow-black shadow-sm first-line:shadow-sm border-4 p-1 focus:border-black outline-none rounded-lg ";
  ConfirmPasswordInputStyles += confirmPasswordError
    ? "border-red-700"
    : "border-transparent";

  // Runs on onKeyUp to store email in state.
  const emailOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setEmail(event.value);
  };

  // Runs on onKeyUp to store password in state.
  const passwordOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setPassword(event.value);
  };

  // Runs on onKeyUp to store confirm password in state.
  const confirmPasswordOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;

    setConfirmPassword(event.value);
  };

  // Checks if the 2 passwords in both input fields are equal.
  const isPasswordsEqual = () => {
    if (confirmPasswordInputRef.current === null) {
      return;
    }

    // If either password field is empty and sets errors.
    if (password === "" || confirmPassword === "") {
      setErrors((prev) => {
        return [...prev, "Password must be filled out"];
      });

      return false;
    }

    // Checks for matching passwords and sets errors.
    if (password === confirmPassword) {
      return true;
    } else {
      setErrors((prev) => {
        return [...prev, "Passwords do not match"];
      });

      return false;
    }
  };

  // Checks if email is error or valid using regex and sets errors.
  const isValidEmail = () => {
    // Checks if email is empty.
    if (email === "") {
      setErrors((prev) => {
        return [...prev, "Email is empty"];
      });

      return false;
    }

    // Checks if email is valid format.
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email) == false) {
      setErrors((prev) => {
        return [...prev, "Email is invalid format"];
      });
      return false;
    }

    return true;
  };

  // Handles the next button click for THIS form.
  const nextClickHandler = () => {
    // Clears current errors.
    setErrors([]);
    var errorsExist = false;
    setEmailError(false);
    setConfirmPasswordError(false);

    // Checks for valid email
    if (!isValidEmail()) {
      errorsExist = true;
      setEmailError(true);
    }

    // Check for equal passwords
    if (!isPasswordsEqual()) {
      errorsExist = true;
      setConfirmPasswordError(true);
    }

    // If there are errors, do not continue.
    if (errorsExist) {
      return;
    }

    nextPage();
  };

  // Prevents tabbing, but not shift+tabing.
  // Used on the next button to prevent going to the next form page.
  const keyDownHandler = (e: any) => {
    if (e.key === "Tab" && e.shiftKey) {
      return;
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Login Info</h1>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          ref={emailInputRef}
          onKeyUp={emailOnChangeHandler}
          className={EmailInputStyles}
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
          className={ConfirmPasswordInputStyles}
        />
      </div>
      <div className="flex flex-row justify-center items-center h-16 w-full">
        <button
          type="button"
          onClick={nextClickHandler}
          className="h-full w-full bg-sky-400"
          disabled={isFormPageAnimated}
        >
          Next
        </button>
      </div>
      <div className="text-red-600">{errors}</div>
    </>
  );
};

export default FormPageOne;

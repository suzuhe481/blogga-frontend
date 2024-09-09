import { useState, useRef } from "react";

interface FormPageOneProps {
  nextPage: () => void;
}

const FormPageOne = ({ nextPage = () => {} }: FormPageOneProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Array<string>>([]);

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

    // If either password field is empty.
    if (password === "" || confirmPassword === "") {
      setErrors((prev) => {
        return [...prev, "Password must be filled out"];
      });

      return false;
    }

    // Changes password input's border color to black/red if there is error.
    if (password === confirmPassword) {
      confirmPasswordInputRef.current.style.borderColor = "#ccc";
      setErrors([]);

      return true;
    } else {
      confirmPasswordInputRef.current.style.borderColor = "red";

      setErrors((prev) => {
        return [...prev, "Passwords do not match"];
      });

      //   setErrors("Passwords do not match");
      return false;
    }
  };

  const nextClickHandler = () => {
    // Clears current errors.
    setErrors([]);

    if (isPasswordsEqual()) {
      nextPage();
    }
  };

  return (
    <>
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
          onClick={nextClickHandler}
          className="h-full w-full bg-sky-400"
        >
          Next
        </button>
      </div>
      <div className="text-red-600">{errors}</div>
    </>
  );
};

export default FormPageOne;
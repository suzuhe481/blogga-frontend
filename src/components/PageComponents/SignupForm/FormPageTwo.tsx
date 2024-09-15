import { useState } from "react";

interface FormPageTwoProps {
  prevPage: () => void;
  isFormPageAnimated: boolean;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormPageTwo = ({
  prevPage = () => {},
  isFormPageAnimated,
  setIsInputFocused,
}: FormPageTwoProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState<Array<string>>([]);

  // Runs on onKeyUp to store first name in state.
  const firstNameOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setFirstName(event.value);
  };

  // Runs on onKeyUp to store last name in state.
  const lastNameOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setLastName(event.value);
  };

  // Runs on onKeyUp to store username in state.
  const usernameOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    setUsername(event.value);
  };

  const prevClickHandler = () => {
    prevPage();
  };

  const signupHandler = () => {
    // Clears current errors.
    setErrors([]);
    var errorsExist = false;
    setFirstNameError(false);
    setLastNameError(false);
    setUsernameError(false);

    if (firstName === "") {
      setFirstNameError(true);
      errorsExist = true;

      setErrors((prev) => {
        return [...prev, "First name is empty"];
      });
    }

    if (lastName === "") {
      setLastNameError(true);
      errorsExist = true;

      setErrors((prev) => {
        return [...prev, "Last name is empty"];
      });
    }

    if (username === "") {
      setUsernameError(true);
      errorsExist = true;

      setErrors((prev) => {
        return [...prev, "Username is empty"];
      });
    }

    // If there are errors, do not continue.
    if (errorsExist) {
      setIsShaking(true);

      setTimeout(() => {
        setIsShaking(false);
      }, 200);
      return;
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Profile Info</h1>
      <div className="flex flex-col">
        <label htmlFor="first_name">First name</label>
        <input
          type="text"
          name="first_name"
          required
          onChange={firstNameOnChangeHandler}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="last_name">Last name</label>
        <input
          type="text"
          name="last_name"
          required
          onChange={lastNameOnChangeHandler}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="username">Username (@ Display name)</label>
        <input
          type="text"
          name="username"
          required
          onChange={usernameOnChangeHandler}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className="shadow-black shadow-sm border-transparent border-4 p-1 focus:border-black outline-none rounded-lg"
        />
      </div>
      <div className="flex flex-row justify-center items-center h-16 w-full gap-2">
        <button
          type="button"
          onClick={prevClickHandler}
          className="h-full w-full bg-sky-400"
          disabled={isFormPageAnimated}
        >
          Previous
        </button>
        <button
          type="submit"
          onClick={signupHandler}
          disabled={isFormPageAnimated}
          className="h-full w-full bg-sky-400"
        >
          Sign Up
        </button>
      </div>
      <div className="text-red-600">
        {errors.map((error, index) => {
          return <li key={index}>{error}</li>;
        })}
      </div>
    </>
  );
};

export default FormPageTwo;

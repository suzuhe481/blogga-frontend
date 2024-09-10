import { useState } from "react";

interface FormPageTwoProps {
  prevPage: () => void;
  isFormPageAnimated: boolean;
}

const FormPageTwo = ({
  prevPage = () => {},
  isFormPageAnimated,
}: FormPageTwoProps) => {
  const [errors, setErrors] = useState<Array<string>>([]);

  return (
    <>
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
      <div className="text-red-600">{errors}</div>
    </>
  );
};

export default FormPageTwo;

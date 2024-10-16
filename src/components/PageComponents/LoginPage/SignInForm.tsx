import LOGO from "../../../assets/images/LOGO_BLUE.png";

import "ldrs/bouncy";

interface ISignInPageProps {
  onLogin: boolean;
  handleToggleForm: () => void;
  handleChangeSigninForm: React.ChangeEventHandler<HTMLInputElement>;
  loginHandler: (e: React.FormEvent) => void;
  loginSubmitted: boolean;
  loginErrors: Array<string>;
  newUserSuccess: boolean;
}

const SignInForm = ({
  onLogin,
  handleToggleForm,
  handleChangeSigninForm,
  loginHandler,
  loginSubmitted,
  loginErrors,
  newUserSuccess,
}: ISignInPageProps) => {
  // Loading animation for submit button.
  const SubmitLoadingAnimation = (
    <l-bouncy size="30" speed="1.75" color="white" />
  );

  const RegisteredSuccessSection = (
    <div className="flex flex-col justify-center items-center mb-8 bg-sky-100 p-4 rounded-md border-[#75C1FF] shadow-[0_0_0_2px_#B3E0FF]">
      <h1 className="text-4xl font-bold">Congratulations!</h1>
      <div className="flex flex-col justify-center items-center">
        <p>You have successfully created your Blogga account.</p>
        <p>
          Please verify your account with the verification link sent to your
          email.
        </p>
      </div>
    </div>
  );

  return (
    <div
      className={`animate-fadeInSlideDown flex flex-col justify-center items-center mt-[2.5rem] mx-auto mb-0 max-w-[90vw] desktop:max-w-[636px] ${
        onLogin ? "" : "hidden"
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
          <button className="w-full border-sky-400 border-2 p-2 rounded-md shadow-[0_0_5px_rgba(56,189,248,0.8)]">
            Sign In
          </button>
        </div>
        <div className="w-[1px] h-[78px] bg-slate-400 mx-4" />
        <div className="flex-1">
          <button
            onClick={handleToggleForm}
            className="w-full border-slate-400 border-2 p-2 rounded-md hover:bg-sky-50 hover:shadow-[0_0_5px_rgba(56,189,248,0.8)]"
          >
            Create Account
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center mb-8">
        {newUserSuccess ? RegisteredSuccessSection : null}
        <div className="w-full text-center font-bold font-FuzzyBubbles text-4xl mb-6">
          Sign In
        </div>
        <form onSubmit={loginHandler} className="w-full">
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              required
              onChange={handleChangeSigninForm}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChangeSigninForm}
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <button
              type="submit"
              className="rounded-md bg-sky-400 hover:bg-sky-600 text-white font-bold py-3 px-4"
            >
              {loginSubmitted ? SubmitLoadingAnimation : "Sign In"}
            </button>
          </div>

          <div className="text-red-600">
            {loginErrors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

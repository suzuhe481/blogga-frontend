import LOGO from "../../../assets/images/LOGO_BLUE.png";

const SignInForm = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[2.5rem] mx-auto mb-0 max-w-[90vw] desktop:max-w-[636px]">
      <div className="flex justify-center items-center mb-4 min-w-[90vw]">
        <img src={LOGO} className="h-24" />
      </div>
      <div className="w-[368px] flex flex-row justify-center items-center mb-4">
        <div className="flex-1">
          <button className="w-full border-sky-400 border-2 p-2 rounded-md shadow-[0_0_5px_rgba(56,189,248,0.8)]">
            Sign In
          </button>
        </div>
        <div className="w-[1px] h-[78px] bg-slate-400 mx-4" />
        <div className="flex-1">
          <button className="w-full border-slate-400 border-2 p-2 rounded-md hover:bg-sky-50 hover:shadow-[0_0_5px_rgba(56,189,248,0.8)]">
            Create Account
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full text-center font-bold font-FuzzyBubbles text-4xl mb-6">
          Sign In
        </div>
        <form className="w-full">
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              required
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
              className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <button className="rounded-md bg-sky-400 hover:bg-sky-600 text-white font-bold py-3 px-4">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

const NotVerifiedWarning = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-8 p-2 animate-fadeInSlide w-auto font-FuzzyBubbles shadow-2xl border rounded-xl">
      <h1 className="text-4xl">You are not verified!</h1>
      <div className="text-2xl text-center">
        <div>Remember To verify your account</div>
        <div>
          <a className="hover:text-sky-400 cursor-pointer font-bold">
            Click here to verify your account if you haven't.
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotVerifiedWarning;

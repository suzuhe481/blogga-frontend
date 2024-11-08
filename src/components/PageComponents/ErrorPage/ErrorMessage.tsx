import LOGO_BLUE from "../../../assets/images/LOGO_BLUE.png";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col text-center shadow-2xl w-[90vw] desktop:w-[50vw] rounded-xl justify-center gap-2 items-center text-sky-400 text-2xl desktop:text-5xl font-FuzzyBubbles font-bold desktop:gap-0">
        <p>Sorry, this page doesn't exist.</p>
        <p>:(</p>
        <a href="/">
          <img
            src={LOGO_BLUE}
            className="h-20 object-contain aspect-auto desktop:h-60"
          />
        </a>
      </div>
    </div>
  );
};

export default ErrorMessage;

import Navbar from "../../UI/Navbar/Navbar";
import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const Welcome = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col shadow-xl justify-center gap-2 items-center h-48 w-full bg-sky-400 text-2xl desktop:text-5xl text-white font-FuzzyBubbles font-bold desktop:h-96 desktop:gap-0">
        Welcome to
        <img
          src={LOGO_WHITE}
          className="h-20 object-contain aspect-auto desktop:h-60"
        />
        <a className="border-2 border-sky-200 rounded-full px-2 py-1 text-lg desktop:text-4xl desktop:4xl desktop:px-4 desktop:py-2 hover:bg-sky-600 text-white">
          <button>Browse</button>
        </a>
      </div>

      <div className="grid grid-rows-2 my-12 mx-4 gap-y-6 h-96 desktop:h-screen font-FuzzyBubbles">
        <div className="relative flex w-full h-full justify-center">
          <div
            className="absolute animate-float-left flex text-center justify-center items-center border-2 border-black size-48 mr-36
          desktop:size-96 desktop:mr-[48rem]"
          >
            This app has cool features.
          </div>
        </div>

        <div className="relative flex w-full h-full justify-center">
          <div
            className="absolute animate-float-right flex text-center justify-center items-center border-2 border-black size-48 ml-36 
          desktop:size-96 desktop:ml-[48rem]"
          >
            Here's some more features this app has.
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;

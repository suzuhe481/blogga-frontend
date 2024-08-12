import Navbar from "../../UI/Navbar/Navbar";
import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const Welcome = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center gap-8 h-96 w-screen bg-sky-400  text-4xl text-white font-FuzzyBubbles font-bold desktop:gap-0">
        Welcome to
        <img
          src={LOGO_WHITE}
          className=" h-36 object-contain aspect-auto desktop:h-64"
        />
        <a className="border-2 rounded-full px-4 py-2 hover:bg-sky-600 bg-sl text-white">
          <button>Browse</button>
        </a>
      </div>

      <div className="grid grid-rows-2 my-12 mx-4 gap-y-6">
        <div className="flex w-full justify-start">
          <div className="absolute flex text-center justify-center items-center border-2 border-black h-48 w-48 ml-8 -rotate-6 desktop:h-96 desktop:w-96 desktop:ml-36">
            This app has cool features.
          </div>
        </div>

        <div className="flex w-full justify-end">
          <div className="flex text-center justify-center items-center border-2 border-black h-48 w-48 mr-8 rotate-6 desktop:h-96 desktop:w-96 desktop:mr-36">
            Here's some more features this app has.
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;

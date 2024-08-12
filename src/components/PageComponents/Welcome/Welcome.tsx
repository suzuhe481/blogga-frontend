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
    </>
  );
};

export default Welcome;

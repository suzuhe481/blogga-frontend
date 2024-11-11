import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const Header = () => {
  return (
    <div
      className={`flex flex-col shadow-xl  justify-center gap-2
          items-center h-[40rem] bg-sky-400
          text-2xl desktop:text-5xl text-white font-FuzzyBubbles font-bold desktop:gap-0`}
    >
      <ScrollAnimation animateIn="fadeIn" offset={0} animatePreScroll={true}>
        <div className="flex flex-col w-full items-center gap-12 desktop:gap-4">
          <div className="text-6xl desktop:text-8xl  text-center">
            Welcome to
          </div>
          <img
            src={LOGO_WHITE}
            className="h-40 object-contain aspect-auto desktop:h-60"
          />
          <a
            href="/browse"
            className={`flex justify-center text-4xl desktop:text-5xl items-center bg-sky-600 w-3/4 h-[5rem]
               desktop:w-3/4 rounded-2xl p-1 desktop:p-2 hover:brightness-110`}
          >
            Browse
          </a>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default Header;

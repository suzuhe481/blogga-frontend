import { useState } from "react";

import LOGO_BLACK from "../../../assets/images/LOGO_BLACK.png";
import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const ErrorMessage = () => {
  const [logo, setLogo] = useState(LOGO_WHITE);

  // Changes logo to BLUE when moure enters.
  const mouseEnterHandler = () => {
    setLogo(LOGO_BLACK);
  };

  // Changes logo to default BLACK when mouse leaves.
  const mouseLeaveHandler = () => {
    setLogo(LOGO_WHITE);
  };

  return (
    <div className="flex flex-col shadow-xl justify-center gap-2 items-center h-screen bg-sky-400 text-2xl desktop:text-5xl text-white font-FuzzyBubbles font-bold desktop:gap-0">
      <p>Sorry, this page doesn't exist.</p>
      <p>:(</p>
      <a href="/">
        <img
          src={logo}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          className="h-20 object-contain aspect-auto desktop:h-60"
        />
      </a>
    </div>
  );
};

export default ErrorMessage;

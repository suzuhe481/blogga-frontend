import { useState } from "react";

import LOGO_BLACK from "../../../../assets/images/LOGO_BLACK.png";
import LOGO_BLUE from "../../../../assets/images/LOGO_BLUE.png";

const LogoContainer = () => {
  const [logo, setLogo] = useState(LOGO_BLACK);

  // Changes logo to BLUE when moure enters.
  const mouseEnterHandler = () => {
    setLogo(LOGO_BLUE);
  };

  // Changes logo to default BLACK when mouse leaves.
  const mouseLeaveHandler = () => {
    setLogo(LOGO_BLACK);
  };

  return (
    <a
      href="/"
      className="h-full"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <img src={logo} className="h-full object-contain aspect-auto" />
    </a>
  );
};

export default LogoContainer;

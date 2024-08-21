import { useState } from "react";

// Interfaces
import { Iuser } from "../Navbar";

interface IProps {
  user: Iuser | false | null;
}

const VerifyBanner = ({ user }: IProps) => {
  const [showBanner, setshowBanner] = useState(true);
  if (!user) {
    return null;
  }

  if (user === null) {
    return;
  }

  if (user.verified) {
    return null;
  }

  function calculateBannerClasses() {
    var bannerClasses =
      "relative flex flex-row justify-center items-center w-screen h-auto bg-yellow-100 py-2 px-8 gap-2 desktop:gap-8";

    if (!showBanner) {
      bannerClasses += " ";
      bannerClasses += "hidden";
    }

    return bannerClasses;
  }

  function closeBannerHandler() {
    setshowBanner(false);
  }

  return (
    <div className={calculateBannerClasses()}>
      <div
        onClick={closeBannerHandler}
        className="left-0 text-lg desktop:text-2xl font-bold px-2 cursor-pointer hover:text-slate-500"
      >
        X
      </div>
      <div className="text-sm desktop:text-lg w-auto">
        You have not verified your account yet. Click here to verify.
      </div>
      <a
        className="text-sky-400 font-bold text-lg p-3 border-2 border-sky-400 rounded-md cursor-pointer
      
    hover:text-white 
    hover:bg-sky-400"
      >
        Verify
      </a>
    </div>
  );
};

export default VerifyBanner;

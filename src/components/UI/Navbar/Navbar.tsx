import { useState, useEffect } from "react";

import VerifyBanner from "./VerifyBanner/VerifyBanner";
import LogoContainer from "./LogoContainer/LogoContainer";
import MenuPublic from "./MenuPublic/MenuPublic";
import ProfileContainer from "./ProfileContainer/ProfileContainer";

import navbarDataUtil from "../../../helpers/navbarDataUtil";

export interface Iuser {
  first_name: string;
  last_name: string;
  verified: Boolean;
}

const Navbar = () => {
  // null = before fetching user
  // false = user not logged in
  const [user, setUser] = useState<Iuser | false | null>(null);

  // Retrieves and sets user data for navbar.
  useEffect(() => {
    navbarDataUtil().then((result) => {
      if (result.error === true) {
        setUser(false);
        return;
      }

      const user: Iuser = {
        first_name: result.first_name,
        last_name: result.last_name,
        verified: result.verified,
      };

      setUser(user);
    });
  }, []);

  return (
    <div className="navbar-container flex flex-col justify-center items-center w-full bg-white border-slate-400 border-b-[1px] py-2 mb-0">
      <div className="navbar flex flex-row justify-evenly items-center h-12 desktop:h-20 w-full mx-48">
        <LogoContainer />
        {user ? (
          <ProfileContainer user={user} />
        ) : user === false ? (
          <MenuPublic />
        ) : (
          ""
        )}
      </div>
      <VerifyBanner user={user} />
    </div>
  );
};

export default Navbar;

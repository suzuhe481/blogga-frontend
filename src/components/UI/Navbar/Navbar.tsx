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
  // false = before fetching user
  // null = no user
  const [user, setUser] = useState<Iuser | false | null>(false);

  // Retrieves and sets user data for navbar.
  useEffect(() => {
    navbarDataUtil().then((result) => {
      if (result.error === true) {
        setUser(null);
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
    <div className="navbar-container flex flex-col justify-center items-center h-auto min-h-28 py-2 w-full">
      <div className="navbar flex flex-row justify-between items-center h-20 w-full mx-2">
        <LogoContainer />
        {!user || null ? <MenuPublic /> : <ProfileContainer user={user} />}
      </div>
      <VerifyBanner user={user} />
    </div>
  );
};

export default Navbar;

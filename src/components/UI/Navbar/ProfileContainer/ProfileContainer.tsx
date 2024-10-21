import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import logoutUtil from "../../../../helpers/logoutUtil";

// Interfaces
import { Iuser } from "../Navbar";

interface IProps {
  user: Iuser;
}

const ProfileContainer = ({ user }: IProps) => {
  const [isdropDownOpen, setisDropDownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Controls isdropDownOpen state.
  function toggleDropDown() {
    setisDropDownOpen((prev) => {
      return !prev;
    });
  }

  // Controls isdropDownOpen state.
  function closeDropDown() {
    setisDropDownOpen(false);
  }

  function handleClickOutsideMenu(e: MouseEvent) {
    const target = e.target as Node;

    // If the profile icon is clicked while menu is open, does nothing HERE.
    // Will continue into profileIcon's toggleDropDown, which will close the menu.
    if (
      isdropDownOpen &&
      profileRef.current &&
      profileRef.current.contains(target)
    ) {
    }
    // If anywhere else on the page is clicked that isn't inside the menu, close the menu.
    else if (
      isdropDownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(target)
    ) {
      closeDropDown();
    }
  }

  async function logoutHandler(e: any) {
    await logoutUtil(e); // Call logout to server.

    // Redirects user to home page.
    window.location.href = "/";
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  });

  // Calculates classes for profile container
  function calculateProfileContainerClasses() {
    const profileContainerClasses =
      "desktop:text-2xl text-base flex flex-row items-center gap-2 cursor-pointer";

    return profileContainerClasses;
  }

  // Calculates classes for Icon
  function calculateIconClasses() {
    var iconClasses = "text-2xl desktop:group-hover:text-sky-400";

    if (isdropDownOpen) {
      iconClasses += " ";
      iconClasses += "text-sky-400";
      return iconClasses;
    } else {
      iconClasses += " ";
      iconClasses += "text-black ";
      return iconClasses;
    }
  }

  // Calculates classes
  function calculateDropDownItemsClasses() {
    const dropDownItemsClasses = `absolute
    flex flex-col rounded-lg bg-blue-400 list-none z-10
    shadow-xl font-FuzzyBubbles
    transition-all
    translate-y-6
    
    ${
      isdropDownOpen
        ? "-translate-x-full "
        : "translate-x-5 desktop:translate-x-48"
    }

    desktop:h-auto
    `;

    return dropDownItemsClasses;
  }

  // Contains the round profile icon with an inner font awesome icon.
  const profileIcon = (
    <div
      ref={profileRef}
      onClick={toggleDropDown}
      className="group flex justify-center items-center min-h-9 min-w-9 border-2 border-black rounded-full cursor-pointer"
    >
      <FontAwesomeIcon icon={faUser} className={`${calculateIconClasses()}`} />
    </div>
  );

  // Dropdown menu contains "My profile", "Logout" links
  const dropdownItems = (
    <div ref={dropdownRef} className={calculateDropDownItemsClasses()}>
      <div className="flex flex-col justify-center items-center relative w-36 desktop:w-44 h-14 p-1 rounded-t-lg hover:bg-sky-600 px-2">
        <a
          href="/"
          className="flex flex-col justify-center items-start w-full h-full"
        >
          My profile
        </a>
      </div>

      {/* Separator */}
      <hr />

      <div className="flex flex-col justify-center items-center relative w-36 desktop:w-44 h-14 p-1 hover:bg-sky-600 px-2">
        <a
          href="/user/settings"
          className="flex flex-col justify-center items-start w-full h-full"
        >
          Settings
        </a>
      </div>

      {/* Separator */}
      <hr />

      <div className="flex flex-col justify-center items-center relative w-36 desktop:w-44 h-14 p-1 rounded-b-lg hover:bg-sky-600 px-2">
        <button
          className="flex flex-col justify-center items-start w-full h-full"
          onMouseDown={logoutHandler}
        >
          Log out
        </button>
      </div>
    </div>
  );

  // Container with signed in user information (name) and dropdown menu.
  const ProfileContainer = (
    <div className={calculateProfileContainerClasses()}>
      <div>
        <div className="desktop:text-2xl text-xl font-FuzzyBubbles">{`${user.first_name} ${user.last_name}`}</div>
      </div>
      {profileIcon}
      <div className="relative">{dropdownItems}</div>
    </div>
  );

  return ProfileContainer;
};

export default ProfileContainer;

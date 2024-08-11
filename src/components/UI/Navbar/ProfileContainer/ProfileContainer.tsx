import { useState } from "react";

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

  // Controls iddropDownOpen state.
  function toggleDropDown() {
    setisDropDownOpen((prev) => {
      return !prev;
    });
  }

  // Controls isdropDownOpen state.
  function closeDropDown() {
    setisDropDownOpen(false);
  }

  async function logoutHandler(e: any) {
    await logoutUtil(e); // Call logout to server.

    // Redirects user to home page.
    window.location.href = "/";
  }

  // Calculates classes for profile container
  function calculateProfileContainerClasses() {
    const profileContainerClasses =
      "desktop:text-2xl text-base w-full flex flex-row justify-end items-center gap-2";

    return profileContainerClasses;
  }

  // Calculates classes for Icon
  function calculateIconClasses() {
    var iconClasses = "text-2xl group-hover:text-slate-200";

    if (isdropDownOpen) {
      iconClasses += " ";
      iconClasses += "text-slate-400";
      return iconClasses;
    } else {
      iconClasses += " ";
      iconClasses += "text-black";
      return iconClasses;
    }
  }

  // Calculates classes
  function calculateDropDownItemsClasses() {
    const dropDownItemsClasses =
      "absolute flex flex-col rounded-md bg-blue-400 list-none z-10";

    return dropDownItemsClasses;
  }

  function calculateDropDownMenuContainerClasses() {
    const dropdownMenuContainerClasses = "absolute desktop:right-16 right-12";

    return dropdownMenuContainerClasses;
  }

  // Contains the round profile icon with an inner font awesome icon.
  const profileIcon = (
    <div className="group flex justify-center items-center min-h-9 min-w-9 border-2 border-black rounded-full cursor-pointer">
      <FontAwesomeIcon icon={faUser} className={`${calculateIconClasses()}`} />
    </div>
  );

  // Dropdown menu contains "My profile", "Logout" links
  const dropdownItems = (
    <div className={calculateDropDownItemsClasses()}>
      <div className="flex flex-col justify-center items-center relative w-36 h-16 p-1 rounded-xl hover:bg-slate-500">
        <a
          href="/"
          className="flex flex-col justify-center items-start w-full h-full"
        >
          My profile
        </a>
      </div>

      {/* Separator */}
      <hr className="my-1 mx-0" />

      <div className="flex flex-col justify-center items-center relative w-36 h-16 p-1 rounded-xl hover:bg-slate-500">
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
    <div
      className={calculateProfileContainerClasses()}
      onClick={toggleDropDown}
      onBlur={closeDropDown}
      tabIndex={0}
    >
      <div className={calculateDropDownMenuContainerClasses()}>
        <div className="m-1 desktop:text-2xl text-xl w-24">{`${user.first_name} ${user.last_name}`}</div>
        {isdropDownOpen ? dropdownItems : null}
      </div>
      {profileIcon}
    </div>
  );

  return ProfileContainer;
};

export default ProfileContainer;

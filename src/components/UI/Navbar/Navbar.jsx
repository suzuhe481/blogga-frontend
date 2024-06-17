import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../../helpers/localStorageUtil";
import { isLoggedIn } from "../../../helpers/localStorageUtil";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isdropDownOpen, setisDropDownOpen] = useState(false);

  const logoStyles = `${styles.title} ${styles["remove-link-style"]}`;

  function toggleDropDown() {
    setisDropDownOpen((prev) => {
      return !prev;
    });
  }

  function closeDropDown() {
    setisDropDownOpen(false);
  }

  // Dropdown menu contains "My profile", "Logout" links
  const dropdownItems = (
    <div className={styles.dropdownItems}>
      <li>
        <a href="/" className={logoStyles}>
          My profile
        </a>
      </li>

      <hr className={styles.separator} />
      <li>
        <a className={logoStyles} onClick={logout}>
          Log out
        </a>
      </li>
    </div>
  );

  // Contains the round profile icon with an inner font awesome icon.
  const profileIcon = (
    <div className={styles.profile}>
      <FontAwesomeIcon
        icon={faUser}
        className={`${styles.icon} ${
          isdropDownOpen ? `${styles.open}` : `${styles.icon}`
        }`}
      />
    </div>
  );

  // Only appears when user is not signed in.
  const signinButton = (
    <div>
      <a
        href="/login"
        className={`${styles.signin} ${styles["remove-link-style"]}`}
      >
        Sign in
      </a>
    </div>
  );

      </div>
    </div>
  );
};

export default Navbar;

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
        <a href="/" className={logoStyles}>
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

  return (
    <div className={`${styles.navbar} ${styles["no-highlight"]}`}>
      <div className={styles.left}>
        <a href="/" className={logoStyles}>
          Blogga
        </a>
      </div>

      <div className={styles.right}>
        <div
          className={styles["profile-container"]}
          onClick={toggleDropDown}
          onBlur={closeDropDown}
          tabIndex={0}
        >
          <div className={styles.dropdownMenuContainer}>
            <div className={styles.name}>Firstname Lastname</div>
            {isdropDownOpen ? dropdownItems : null}
          </div>
          {profileIcon}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

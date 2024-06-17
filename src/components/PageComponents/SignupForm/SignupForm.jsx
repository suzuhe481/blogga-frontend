import { useState, useRef } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import styles from "./SignupForm.module.scss";

import signUpUtil from "../../../helpers/signupUtil";

const SignupForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const confirmPasswordInputRef = useRef(null);

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordOnChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordsEqual = () => {
    // Changes password input's border color to black/red if there is error.
    if (password === confirmPassword) {
      confirmPasswordInputRef.current.style.borderColor = "#ccc";

      return true;
    } else {
      confirmPasswordInputRef.current.style.borderColor = "red";

      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isPasswordsEqual()) {
      signUpUtil(e);
    } else {
      console.log("form has errors");
    }
  };

  return (
    <div className={styles["page-container"]}>
      <Navbar />

      <div className={styles["form-container"]}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="form-title">
            <h1>Sign Up</h1>
          </div>

          <div className={styles["form-group-container"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="first_name">First name</label>
              <input type="text" name="first_name" required />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="last_name">Last name</label>
              <input type="text" name="last_name" required />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" required />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                required
                onKeyUp={passwordOnChangeHandler}
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="confirm_password">Confirm password</label>
              <input
                type="password"
                name="confirm_password"
                required
                onKeyUp={confirmPasswordOnChangeHandler}
                ref={confirmPasswordInputRef}
              />
            </div>
          </div>

          <div className="form-submit">
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
